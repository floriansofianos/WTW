var models = require('../models');
var userService = require('./userService')();
var userTVQuestionnaireService = require('./userTVQuestionnaireService')();
var tvRecommandationService = require('./tvRecommandationService')();
const Sequelize = require('../models').sequelize;
var _ = require('underscore');


var tvQuestionnaireService = function() {

    var getAll = function (userId, done) {
        if (!userId) return done(null, []);
        models.TVQuestionnaire.findAll({ where: { userId: userId } }).then(data => {
            done(null, data);
        }).catch(function(err) {
            done(err);
        });
    }

    var getSampleLikedTVs = function (userId, done) {
        if (!userId) return done(null, []);
        models.TVQuestionnaire.findAll({
            where: {
                userId: userId,
                isSeen: true,
                rating: { $in: [4, 5] }
            },
            order: [
                Sequelize.fn('RANDOM')
            ],
            limit: 2
        }).then(data => {
            done(null, data);
        }).catch(function (err) {
            done(err);
        });
    }

    var getUsersThatAlsoLiked = function (userId, done) {
        var Op = Sequelize.Op;
        models.TVQuestionnaire.find({
            where: {
                userId: userId,
                isSeen: true,
                rating: 5
            },
            order: [
                Sequelize.fn('RANDOM')
            ]
        }).then(data => {
            if (data) {
                var tvId = data.movieDBId;
                models.TVQuestionnaire.findAll({
                    where: {
                        movieDBId: tvId,
                        isSeen: true,
                        rating: 5,
                        userId: {
                            [Op.ne]: userId
                        }
                    },
                    order: [
                        Sequelize.fn('RANDOM')
                    ],
                    limit: 5
                }).then(users => {
                    var userIds = _.map(users, 'userId');
                    // Check if we have at least one result
                    if (userIds.length < 1) return done(null, false);
                    models.User.findAll({
                        where: {
                            id: {
                                [Op.or]: userIds
                            }
                        }
                    }).then(users => {
                        var usersToView = _.map(users, function (u) { return { id: u.id, username: u.username, movieDBId: tvId } });
                        return done(null, usersToView);
                        }).catch(function (err) {
                            done(err);
                        });
                }).catch(function (err) {
                    done(err);
                });
            }
            else done(null, data);
        }).catch(function (err) {
            done(err);
        });
    }

    var get = function(userId, movieId, done) {
        models.TVQuestionnaire.findOne({ where: { userId: userId, movieDBId: movieId } }).then(data => {
            done(null, data);
        }).catch(function(err) {
            done(err);
        });
    }

    var getWatchlist = function (userId, done) {
        if (!userId) return done(null, []);
        models.TVQuestionnaire.findAll({ where: { userId: userId, isSeen: false, wantToSee: true } }).then(data => {
            done(null, data);
        }).catch(function(err) {
            done(err);
        });
    }

    var createOrUpdate = function(tvQuestionnaire, userId, timelineEventService, done) {
        models.TVQuestionnaire.findOne({ where: { userId: userId, movieDBId: tvQuestionnaire.movieDBId } }).then(data => {
            if (data) {
                data.isSeen = tvQuestionnaire.isSeen;
                data.rating = tvQuestionnaire.rating;
                data.wantToSee = tvQuestionnaire.wantToSee;
                data.isSkipped = tvQuestionnaire.isSkipped;
                data.save().then(questionnaire => {
                    userService.setUserProfileRefresh(userId, true, function (err, res) {
                        if (err) return done(err);
                        userTVQuestionnaireService.deleteQuestionnaire(userId, tvQuestionnaire.movieDBId, function (err, res) {
                            if (err) return done(err);
                            tvRecommandationService.deleteRecommandation(userId, tvQuestionnaire.movieDBId, function (err, res) {
                                if (err) return done(err);
                                if (!questionnaire.isSkipped) {
                                    timelineEventService.create(userId, 0, { questionnaire: questionnaire, isTV: true }, function (err, res) {
                                        if (err) return done(err);
                                        done(null, questionnaire);
                                    });
                                }
                                else done(null, questionnaire);
                            });
                        });
                    });
                });
            }
            else {
                models.TVQuestionnaire.create({
                    userId: userId,
                    movieDBId: tvQuestionnaire.movieDBId,
                    isSeen: tvQuestionnaire.isSeen,
                    rating: tvQuestionnaire.rating,
                    wantToSee: tvQuestionnaire.wantToSee,
                    isSkipped: tvQuestionnaire.isSkipped
                }).then(questionnaire => {
                    userService.setUserProfileRefresh(userId, true, function (err, res) {
                        if (err) return done(err);
                        userTVQuestionnaireService.deleteQuestionnaire(userId, tvQuestionnaire.movieDBId, function (err, res) {
                            if (err) return done(err);
                            tvRecommandationService.deleteRecommandation(userId, tvQuestionnaire.movieDBId, function (err, res) {
                                if (err) return done(err);
                                if (!questionnaire.isSkipped) {
                                    timelineEventService.create(userId, 0, { questionnaire: questionnaire, isTV: true }, function (err, res) {
                                        if (err) return done(err);
                                        done(null, questionnaire);
                                    });
                                }
                                else done(null, questionnaire);
                            });
                        });
                    });
                }).catch(function(err) {
                    done(err);
                });
            }
        }).catch(function(err) {
            done(err);
        });


    }

    return {
        getAll: getAll,
        createOrUpdate: createOrUpdate,
        get: get,
        getWatchlist: getWatchlist,
        getUsersThatAlsoLiked: getUsersThatAlsoLiked,
        getSampleLikedTVs: getSampleLikedTVs
    }
}

module.exports = tvQuestionnaireService;