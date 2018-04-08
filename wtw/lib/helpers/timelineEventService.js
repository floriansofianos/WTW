var models = require('../models');
const sequelize = require('sequelize');

module.exports = function () {
    var getPage = function (userId, followerIds, page, done) {
        var Op = sequelize.Op;
        var resultPerPage = 20;
        models.TimelineEvent.findAll({ where: { [Op.or]: [{ userId: userId, type: { $in: [0, 1] } }, { userId: { $in: followerIds } }] }, offset: resultPerPage * page, limit: resultPerPage, order: [['id', 'DESC']] }).then(events => {
            done(null, events);
        })
            .catch(function (err) {
                done(err);
            });
    }

    // Types
    // 0: Rate movie/tv
    // 1: Follow
    // 2: Friend
    var create = function (userId, type, variables, done) {
        if (type == 0 && variables.isTV) {
            // First check if we do not have the same event already
            models.TimelineEvent.findAll({
                where: {
                    userId: userId, type: type, variables: {
                        questionnaire: {
                            movieDBId: variables.questionnaire.movieDBId, rating: variables.questionnaire.rating, isSeen: variables.questionnaire.isSeen,
                            wantToSee: variables.questionnaire.wantToSee
                        },
                        isTV: variables.isTV
                    }
                }
            }).then(results => {
                if (results.length < 1) {
                    models.TimelineEvent.create({
                        userId: userId,
                        type: type,
                        variables: variables,
                        isShared: true
                    }).then(event => {
                        done(null, event);
                    }).catch(function (err) {
                        done(err);
                    });
                }
                else {
                    done(null, results[0]);
                }
            })
                .catch(function (err) {
                    done(err);
                });
        }
        else if (type == 0) {
            // First check if we do not have the same event already
            models.TimelineEvent.findAll({
                where: {
                    userId: userId, type: type, variables: {
                        questionnaire: {
                            movieDBId: variables.questionnaire.movieDBId, rating: variables.questionnaire.rating, isSeen: variables.questionnaire.isSeen,
                            wantToSee: variables.questionnaire.wantToSee
                        }
                    }
                }
            }).then(results => {
                if (results.length < 1) {
                    models.TimelineEvent.create({
                        userId: userId,
                        type: type,
                        variables: variables,
                        isShared: true
                    }).then(event => {
                        done(null, event);
                    }).catch(function (err) {
                        done(err);
                    });
                }
                else {
                    done(null, results[0]);
                }
            })
                .catch(function (err) {
                    done(err);
                });
        }
        else {
            models.TimelineEvent.create({
                userId: userId,
                type: type,
                variables: variables,
                isShared: true
            }).then(event => {
                done(null, event);
            }).catch(function (err) {
                done(err);
            });
        }
    }

    return {
        getPage: getPage,
        create: create
    }
}