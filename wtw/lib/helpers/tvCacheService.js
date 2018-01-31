var models = require('../models');

var tvCacheService = function() {

    var getAllInArray = function(movieIds, done) {
        models.TVShowInfoCache.findAll({ where: { movieDBId: { $in: movieIds } } }).then(tvShowInfos => {
            models.TVShowCreditsCache.findAll({ where: { movieDBId: { $in: movieIds } } }).then(tvShowCredits => {
                done(null, { tvShowInfos: tvShowInfos, tvShowCredits: tvShowCredits });
            });
        })
            .catch(function(err) {
                done(err);
            });
    }

    var getAllInArrayWithLang = function(movieIds, lang, done) {
        models.TVShowInfoCache.findAll({ where: { movieDBId: { $in: movieIds }, lang: lang } }).then(tvShowInfos => {
            done(null, tvShowInfos);
        })
            .catch(function(err) {
                done(err);
            });
    }

    return {
        getAllInArray: getAllInArray,
        getAllInArrayWithLang: getAllInArrayWithLang
    }
}

module.exports = tvCacheService;