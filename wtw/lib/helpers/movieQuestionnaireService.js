﻿var models = require('../models');
var userService = require('./userService')();
var userQuestionnaireService = require('./userQuestionnaireService')();
var movieRecommandationService = require('./movieRecommandationService')();

var movieQuestionnaireService = function () {

    var getAll = function (userId, done) {
        models.MovieQuestionnaire.findAll({ where: { userId: userId } }).then(data => {
            done(null, data);
        });
    }

    var get = function (userId, movieId, done) {
        models.MovieQuestionnaire.findOne({ where: { userId: userId, movieDBId: movieId } }).then(data => {
            done(null, data);
        });
    }

    var getWatchlist = function (userId, done) {
        models.MovieQuestionnaire.findAll({ where: { userId: userId, isSeen: false, wantToSee: true } }).then(data => {
            done(null, data);
        });
    }

    var createOrUpdate = function (movieQuestionnaire, userId, done) {
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
                    userService.setUserProfileRefresh(userId, true, function (err, res) {
                        userQuestionnaireService.deleteQuestionnaire(userId, movieQuestionnaire.movieDBId, function (err, res) {
                            movieRecommandationService.deleteRecommandation(userId, movieQuestionnaire.movieDBId, function (err, res) {
                                done(null, questionnaire);
                            });
                        });
                    });
                });
            }
        });


    }

    return {
        getAll: getAll,
        createOrUpdate: createOrUpdate,
        get: get,
        getWatchlist: getWatchlist
    }
}

module.exports = movieQuestionnaireService;