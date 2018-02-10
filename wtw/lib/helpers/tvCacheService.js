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

    var get = function (movieId, done) {
        models.TVShowInfoCache.findAll({ where: { movieDBId: movieId } }).then(tvShowInfo => {
            models.TVShowCreditsCache.findAll({ where: { movieDBId: movieId } }).then(tvShowCredits => {
                done(null, { tvShowInfo: tvShowInfo, tvShowCredits: tvShowCredits });
            });
        })
            .catch(function (err) {
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

    var getWithTrailer = function (id, lang, done) {
        models.TVShowInfoCache.findAll({ where: { movieDBId: movieId, lang: lang } }).then(tvShowInfo => {
            models.TVShowCreditsCache.findAll({ where: { movieDBId: movieId } }).then(tvShowCredits => {
                models.TVVideoCache.findAll({ where: { movieDBId: movieId, lang: lang } }).then(tvVideo => {
                    done(null, { tvShowInfo: tvShowInfo, tvShowCredits: tvShowCredits, trailers: tvVideo });
                }).catch(function (err) {
                    done(err);
                });
            }).catch(function (err) {
                done(err);
            });
        }).catch(function (err) {
                done(err);
        });
    }

    return {
        getAllInArray: getAllInArray,
        getAllInArrayWithLang: getAllInArrayWithLang,
        get: get,
        getWithTrailer: getWithTrailer
    }
}

module.exports = tvCacheService;