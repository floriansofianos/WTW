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

            getMovie(movieId, lang, (err, data) => {
                if (err) return done(err, null);
                // Retrieve the trailer if available
                var movie = data;
                mdb.movieVideos({ id: movieId }, (err, data) => {
                    if (!err) {
                        movie.trailers = data.results;
                        // Retrieve the cast if available
                        mdb.movieCredits({ id: movieId }, (err, data) => {
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
        });
    };

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

    var getMovieTrailer = function (movie, id) {

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

    var loadConfiguration = function (done) {
        mdb.configuration({}, (err, data) => {
            if (err) return done(err, null);
            else {
                cache.put('movieDBConfiguration', data);
                return done(null, data);
            }
        });
    }

    var getConfiguration = function () {
        return cache.get('movieDBConfiguration');
    }

    var getCast = function (id, done) {
        mdb.personMovieCredits({ id: id }, (err, data) => {
            if (err) return done(err, null);
            else {
                return done(null, data);
            }
        })
    }

    return {
        getFirstTenMovies: getFirstTenMovies,
        loadConfiguration: loadConfiguration,
        getConfiguration: getConfiguration,
        getCast: getCast
    }
}