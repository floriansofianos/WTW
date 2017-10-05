var models = require('../models');

var movieCacheService = function () {

    var getAllInArray = function (movieIds, done) {
        models.MovieInfoCache.findAll({ where: { movieDBId: { $in: movieIds } } }).then(movieInfos => {
            models.MovieCreditsCache.findAll({ where: { movieDBId: { $in: movieIds } } }).then(movieCredits => {
                done(null, { movieInfos: movieInfos, movieCredits: movieCredits });
            });
        });
    }

    var getAllInArrayWithLang = function (movieIds, lang, done) {
        models.MovieInfoCache.findAll({ where: { movieDBId: { $in: movieIds }, lang: lang } }).then(movieInfos => {
            done(null, movieInfos);
        });
    }

    return {
        getAllInArray: getAllInArray,
        getAllInArrayWithLang: getAllInArrayWithLang
    }
}

module.exports = movieCacheService;