var models = require('../models');

var movieCacheService = function () {

    var getAllInArray = function (movieIds, done) {
        models.MovieInfoCache.findAll({ where: { movieDBId: { $in: movieIds } } }).then(movieInfos => {
            models.MovieCreditsCache.findAll({ where: { movieDBId: { $in: movieIds } } }).then(movieCredits => {
                done(null, { movieInfos: movieInfos, movieCredits: movieCredits });
            });
        });
    }

    return {
        getAllInArray: getAllInArray
    }
}

module.exports = movieCacheService;