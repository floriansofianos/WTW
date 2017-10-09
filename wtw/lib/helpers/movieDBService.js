var mdb = require('moviedb')('d03322a5a892ce280f22234584618e9e');
var library = require('../helpers/library')();
var cache = require('memory-cache');
var date = require('date-and-time');
var _ = require('underscore');
var models = require('../models');

module.exports = function () {
    var getFirstTenMovies = function (lang, done) {
        firstTenQuery.page = library.randomInt(0, 25);
        mdb.discoverMovie(firstTenQuery, (err, data) => {
            if (err) return done(err, null);
            var movieId = data.results[library.randomInt(0, data.results.length)].id;
            getMovieWithAdditionalInfo(movieId, lang, (err, data) => {
                if (err) return done(err, null);
                else return done(null, data);
            });
        });
    };

    var getAllMovies = function (movieIds, lang, movieCacheService, done) {
        if (movieIds.constructor !== Array) movieIds = [movieIds];
        movieCacheService.getAllInArrayWithLang(movieIds, lang, function (err, data) {
            data = _.map(data, 'data');
            // Get rid of duplicates
            data = _.map(_.groupBy(data, 'id'), function (g) {
                return g[0];
            });
            var missingMovieIds = _.filter(movieIds, function (id) { return !_.find(data, function (d) { return d.id == id }); });
            if (missingMovieIds && missingMovieIds.length > 0) {
                getMoviesFromMovieDB(missingMovieIds, lang, 0, [], function (err, res) {
                    if (err) return done(err, null);
                    else {
                        data = data.concat(res);
                        done(null, data);
                    }
                });
            }
            else done(null, data);
        });
    }

    var getMoviesFromMovieDB = function (movieIds, lang, i, data, done) {
        if (i < movieIds.length) {
            getMovieFromMovieDB(movieIds[i], lang, null, (err, movie) => {
                if (err) return done(err, null);
                else {
                    data.push(movie);
                    getMoviesFromMovieDB(movieIds, lang, i + 1, data, done);
                }
            });
        }
        else done(null, data);
    }

    var getMoviesForGenreQuestionnaire = function (genreId, done) {
        var query = JSON.parse(JSON.stringify(questionnaireQuery));
        query.with_genres = genreId;
        query.page = library.randomInt(0, 100);
        mdb.discoverMovie(query, (err, data) => {
            if (err) return done(err, null);
            else {
                return done(null, data);
            }
        });
    }

    var getMoviesForDirectorQuestionnaire = function (directorId, done) {
        var query = JSON.parse(JSON.stringify(questionnaireQuery));
        query.with_crew = directorId;
        mdb.discoverMovie(query, (err, data) => {
            if (err) return done(err, null);
            else {
                return done(null, data);
            }
        });
    }

    var getMoviesForWriterQuestionnaire = function (writerId, done) {
        var query = JSON.parse(JSON.stringify(questionnaireQuery));
        query.with_crew = writerId;
        mdb.discoverMovie(query, (err, data) => {
            if (err) return done(err, null);
            else {
                return done(null, data);
            }
        });
    }

    var getMoviesForActorQuestionnaire = function (castIds, done) {
        var query = JSON.parse(JSON.stringify(questionnaireQuery));
        var allCastIds = _.reduce(castIds, function (memo, c) { memo + (memo == '' ? '' : ',') + c });
        query.with_cast = allCastIds;
        mdb.discoverMovie(query, (err, data) => {
            if (err) return done(err, null);
            else {
                return done(null, data);
            }
        });
    }

    var getMovieWithAdditionalInfo = function (id, lang, done) {
        getMovie(id, lang, (err, data) => {
            if (err) return done(err, null);
            // Retrieve the trailer if available
            var movie = data;
            getMovieTrailer(id, (err, data) => {
                if (!err) {
                    movie.trailers = data.results;
                    // Retrieve the cast if available
                    getMovieCredits(id, (err, data) => {
                        if (!err) {
                            movie.actors = getActors(data);
                            movie.directors = getDirectors(data);
                            movie.writers = getWriters(data);
                        }
                        return done(null, movie);
                    });
                }
                else return done(null, movie);
            });
        });
    }

    /// Gets a movie from Cache or movieDB if not cached
    var getMovie = function (id, lang, done) {
        getMovieFromCache(id, lang, (err, movie) => {
            if (movie) {
                if (date.addYears(movie.updatedAt, 1) > new Date()) return done(null, movie.data);
                else {
                    getMovieFromMovieDB(id, lang, movie, (err, movie) => {
                        if (err) return done(err, null);
                        else return done(null, movie);
                    });
                }
            }
            else {
                // Retrieve all the information about this movie
                getMovieFromMovieDB(id, lang, null, (err, movie) => {
                    if (err) return done(err, null);
                    else return done(null, movie);
                });
            }
        });
    }

    /// Gets a movie from movieDB and sets the cache
    var getMovieFromMovieDB = function (id, lang, movieCache, done) {
        mdb.movieInfo({ id: id, language: lang }, (err, data) => {
            if (err) return done(err, null);
            var movie = data;
            if (!movieCache) {
                setMovieCache(id, lang, movie, (err, data) => {
                    if (err) return done(err, null);
                    else return done(null, movie);
                });
            }
            else {
                movieCache.data = movie;
                movieCache.save().then(function (m, err) {
                    if (err) done(err, null);
                    else return done(null, movie);
                });
            }
        });
    }

    var getMovieFromCache = function (id, lang, done) {
        models.MovieInfoCache.findOne({ where: { movieDBId: id, lang: lang } }).then(movie => {
            done(null, movie);
        });
    }

    var setMovieCache = function (id, lang, data, done) {
        models.MovieInfoCache.create({
            movieDBId: id,
            lang: lang,
            data: data
        }).then(movieCache => {
            done(null, movieCache);
        });
    }

    var getMovieTrailer = function (id, done) {
        getMovieTrailersFromCache(id, (err, trailers) => {
            if (trailers) {
                if (date.addYears(trailers.updatedAt, 1) > new Date()) return done(null, trailers.data);
                else {
                    getMovieTrailersFromMovieDB(id, trailers, (err, trailers) => {
                        if (err) return done(err, null);
                        else return done(null, trailers);
                    });
                }
            }
            else {
                // Retrieve all the information about this movie
                getMovieTrailersFromMovieDB(id, null, (err, trailers) => {
                    if (err) return done(err, null);
                    else return done(null, trailers);
                });
            }
        });
    }

    /// Gets trailers from movieDB and sets the cache
    var getMovieTrailersFromMovieDB = function (id, trailersCache, done) {
        mdb.movieVideos({ id: id }, (err, data) => {
            if (err) return done(err, null);
            var trailers = data;
            if (!trailersCache) {
                setMovieTrailersCache(id, trailers, (err, data) => {
                    if (err) return done(err, null);
                    else return done(null, trailers);
                });
            }
            else {
                trailersCache.data = trailers;
                trailersCache.save().then(function (m, err) {
                    if (err) done(err, null);
                    else return done(null, trailers);
                });
            }
        });
    }

    var getMovieTrailersFromCache = function (id, done) {
        models.MovieVideoCache.findOne({ where: { movieDBId: id } }).then(trailers => {
            done(null, trailers);
        });
    }

    var setMovieTrailersCache = function (id, data, done) {
        models.MovieVideoCache.create({
            movieDBId: id,
            data: data
        }).then(trailersCache => {
            done(null, trailersCache);
        });
    }

    var getMovieCredits = function (id, done) {
        getMovieCreditsFromCache(id, (err, credits) => {
            if (credits) {
                if (date.addYears(credits.updatedAt, 1) > new Date()) return done(null, credits.data);
                else {
                    getMovieCreditsFromMovieDB(id, credits, (err, credits) => {
                        if (err) return done(err, null);
                        else return done(null, credits);
                    });
                }
            }
            else {
                // Retrieve all the information about this movie
                getMovieCreditsFromMovieDB(id, null, (err, credits) => {
                    if (err) return done(err, null);
                    else return done(null, credits);
                });
            }
        });
    }

    /// Gets trailers from movieDB and sets the cache
    var getMovieCreditsFromMovieDB = function (id, creditsCache, done) {
        mdb.movieCredits({ id: id }, (err, data) => {
            if (err) return done(err, null);
            var credits = data;
            if (!creditsCache) {
                setMovieCreditsCache(id, credits, (err, data) => {
                    if (err) return done(err, null);
                    else return done(null, credits);
                });
            }
            else {
                creditsCache.data = credits;
                creditsCache.save().then(function (m, err) {
                    if (err) done(err, null);
                    else return done(null, credits);
                });
            }
        });
    }

    var getMovieCreditsFromCache = function (id, done) {
        models.MovieCreditsCache.findOne({ where: { movieDBId: id } }).then(credits => {
            done(null, credits);
        });
    }

    var setMovieCreditsCache = function (id, data, done) {
        models.MovieCreditsCache.create({
            movieDBId: id,
            data: data
        }).then(creditsCache => {
            done(null, creditsCache);
        });
    }

    var getActors = function (credits) {
        return credits.cast.slice(0, Math.min(5, credits.cast.length));
    };

    var getDirectors = function (credits) {
        return _.filter(credits.crew, function (c) { return c.job == 'Director' });
    }

    var getWriters = function (credits) {
        return _.filter(credits.crew, function (c) { return c.job == 'Writer' || c.job == 'Screenplay' });
    }

    var firstTenQuery = {
        'include_adult': false,
        'include_video': false,
        'sort_by': 'popularity.desc',
        'release_date.lte': new Date('2017-01-01'),
        'release_date.gte': new Date('1980-01-01')
    }

    var questionnaireQuery = {
        'include_adult': false,
        'include_video': false,
        'sort_by': 'popularity.desc',
        'release_date.lte': new Date('2017-01-01')
    }

    var loadConfiguration = function (done) {
        mdb.configuration({}, (err, data) => {
            if (err) return done(err, null);
            else {
                cache.put('movieDBConfiguration', data);
                return done(null, data);
            }
        });
    }

    var loadGenres = function (done) {
        mdb.genreMovieList({}, (err, data) => {
            if (err) return done(err, null);
            else {
                cache.put('movieDBGenres', data);
                return done(null, data);
            }
        });
    }

    var getGenres = function () {
        return cache.get('movieDBGenres');
    }

    var getConfiguration = function () {
        return cache.get('movieDBConfiguration');
    }

    var getCast = function (id, done) {
        getCastFromCache(id, (err, cast) => {
            if (cast) {
                if (date.addMonths(cast.updatedAt, 1) > new Date()) return done(null, cast.data);
                else {
                    getCastFromMovieDB(id, cast, (err, cast) => {
                        if (err) return done(err, null);
                        else return done(null, cast);
                    });
                }
            }
            else {
                // Retrieve all the information about this movie
                getCastFromMovieDB(id, null, (err, cast) => {
                    if (err) return done(err, null);
                    else return done(null, cast);
                });
            }
        });
    }

    /// Gets cast from movieDB and sets the cache
    var getCastFromMovieDB = function (id, castCache, done) {
        mdb.personMovieCredits({ id: id }, (err, data) => {
            if (err) return done(err, null);
            var cast = data;
            if (!castCache) {
                setCastCache(id, cast, (err, data) => {
                    if (err) return done(err, null);
                    else return done(null, cast);
                });
            }
            else {
                castCache.data = cast;
                castCache.save().then(function (m, err) {
                    if (err) done(err, null);
                    else return done(null, cast);
                });
            }
        });
    }

    var getCastFromCache = function (id, done) {
        models.CastCache.findOne({ where: { movieDBId: id } }).then(cast => {
            done(null, cast);
        });
    }

    var setCastCache = function (id, data, done) {
        models.CastCache.create({
            movieDBId: id,
            data: data
        }).then(castCache => {
            done(null, castCache);
        });
    }

    var search = function (s, done) {
        mdb.searchMovie({ query: s, include_adult: false }, (err, data) => {
            if (err) return done(err, null);
            else {
                return done(null, data);
            }
        });
    }

    return {
        getFirstTenMovies: getFirstTenMovies,
        loadConfiguration: loadConfiguration,
        getConfiguration: getConfiguration,
        loadGenres: loadGenres,
        getGenres: getGenres,
        getMovieWithAdditionalInfo: getMovieWithAdditionalInfo,
        getCast: getCast,
        search: search,
        getMovie: getMovie,
        getMovieCredits: getMovieCredits,
        getDirectors: getDirectors,
        getWriters: getWriters,
        getActors: getActors,
        getMoviesForGenreQuestionnaire: getMoviesForGenreQuestionnaire,
        getMoviesForDirectorQuestionnaire: getMoviesForDirectorQuestionnaire,
        getMoviesForWriterQuestionnaire: getMoviesForWriterQuestionnaire,
        getMoviesForActorQuestionnaire: getMoviesForActorQuestionnaire,
        getAllMovies: getAllMovies
    }
}