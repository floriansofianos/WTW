var models = require('../models');
var sequelize = require('sequelize');

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

    var getRandom = function (lang, done) {
        var Op = sequelize.Op;
        models.TVShowInfoCache.find({
            where: {
                lang: lang,
                data: {
                    popularity: {
                        [Op.gte]: 35
                    }
                }
            },
            order: [
                sequelize.fn('RANDOM'),
            ]
        }).then(data => {
            done(null, data);
        }).catch(function (err) {
            done(err);
        });
    }

    var getWithTrailer = function (id, lang, done) {
        models.TVShowInfoCache.findOne({ where: { movieDBId: id, lang: lang } }).then(tvShowInfo => {
            models.TVShowCreditsCache.findOne({ where: { movieDBId: id } }).then(tvShowCredits => {
                models.TVVideoCache.findOne({ where: { movieDBId: id, lang: lang } }).then(tvVideo => {
                    var trailersData = tvVideo ? tvVideo.data : null;
                    done(null, { tvShowInfo: tvShowInfo.data, tvShowCredits: tvShowCredits.data, trailers: trailersData });
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
        getWithTrailer: getWithTrailer,
        getRandom: getRandom
    }
}

module.exports = tvCacheService;