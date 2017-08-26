var mdb = require('moviedb')('d03322a5a892ce280f22234584618e9e');
var library = require('../helpers/library')();
var cache = require('memory-cache');
var _ = require('underscore');


module.exports = function () {
    var getFirstTenMovies = function (lang, done) {
        firstTenQuery.page = library.randomInt(0, 25);
        mdb.discoverMovie(firstTenQuery, (err, data) => {
            if (err) return done(err, null);
            var movieId = data.results[library.randomInt(0, data.results.length)].id;

            // Retrieve all the information about this movie
            mdb.movieInfo({ id: movieId, language: lang }, (err, data) => {
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
            })
        });
    };

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