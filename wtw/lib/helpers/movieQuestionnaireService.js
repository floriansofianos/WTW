var models = require('../models');
var userService = require('./userService')();
var userQuestionnaireService = require('./userQuestionnaireService')();
var movieRecommandationService = require('./movieRecommandationService')();
const Sequelize = require('../models').sequelize;
var _ = require('underscore');


var movieQuestionnaireService = function() {

    var getAll = function (userId, done) {
        if (!userId) return done(null, []);
        models.MovieQuestionnaire.findAll({ where: { userId: userId } }).then(data => {
            done(null, data);
        }).catch(function(err) {
            done(err);
        });
    }

    var getUsersThatAlsoLiked = function (userId, done) {
        var Op = Sequelize.Op;
        models.MovieQuestionnaire.find({
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
                var movieId = data.movieDBId;
                models.MovieQuestionnaire.findAll({
                    where: {
                        movieDBId: movieId,
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
                        var usersToView = _.map(users, function (u) { return { id: u.id, username: u.username, movieDBId: movieId } });
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
        models.MovieQuestionnaire.findOne({ where: { userId: userId, movieDBId: movieId } }).then(data => {
            done(null, data);
        }).catch(function(err) {
            done(err);
        });
    }

    var getWatchlist = function (userId, done) {
        if (!userId) return done(null, []);
        models.MovieQuestionnaire.findAll({ where: { userId: userId, isSeen: false, wantToSee: true } }).then(data => {
            done(null, data);
        }).catch(function(err) {
            done(err);
        });
    }

    var createOrUpdate = function(movieQuestionnaire, userId, done) {
        models.MovieQuestionnaire.findOne({ where: { userId: userId, movieDBId: movieQuestionnaire.movieDBId } }).then(data => {
            if (data) {
                data.isSeen = movieQuestionnaire.isSeen;
                data.rating = movieQuestionnaire.rating;
                data.wantToSee = movieQuestionnaire.wantToSee;
                data.isSkipped = movieQuestionnaire.isSkipped;
                data.save().then(questionnaire => {
                    userService.setUserProfileRefresh(userId, true, function(err, res) {
                        userQuestionnaireService.deleteQuestionnaire(userId, movieQuestionnaire.movieDBId, function(err, res) {
                            movieRecommandationService.deleteRecommandation(userId, movieQuestionnaire.movieDBId, function(err, res) {
                                done(null, questionnaire);
                            });
                        });
                    });
                });
            }
            else {
                models.MovieQuestionnaire.create({
                    userId: userId,
                    movieDBId: movieQuestionnaire.movieDBId,
                    isSeen: movieQuestionnaire.isSeen,
                    rating: movieQuestionnaire.rating,
                    wantToSee: movieQuestionnaire.wantToSee,
                    isSkipped: movieQuestionnaire.isSkipped
                }).then(questionnaire => {
                    userService.setUserProfileRefresh(userId, true, function(err, res) {
                        userQuestionnaireService.deleteQuestionnaire(userId, movieQuestionnaire.movieDBId, function(err, res) {
                            movieRecommandationService.deleteRecommandation(userId, movieQuestionnaire.movieDBId, function(err, res) {
                                done(null, questionnaire);
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
        getUsersThatAlsoLiked: getUsersThatAlsoLiked
    }
}

module.exports = movieQuestionnaireService;