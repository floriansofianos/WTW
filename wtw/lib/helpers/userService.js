var models = require('../models');
var sequelize = require('sequelize');
var _ = require('underscore');
var guid = require('guid');
const Sequelize = require('../models').sequelize;

var userService = function() {

    var getUserByUsername = function(username, done) {
        models.User.findOne({ where: { username: username } }).then(user => {
            done(null, user);
        }).catch(function(err) {
            done(err);
        });
    }

    var getUserByEmail = function(email, done) {
        models.User.findOne({ where: { email: email } }).then(user => {
            done(null, user);
        }).catch(function(err) {
            done(err);
        });
    }

    var getUserFromValidationToken = function (token, done) {
        models.User.findOne({ where: { emailValidationGuid: token } }).then(user => {
            done(null, user);
        }).catch(function (err) {
            done(err);
        });
    }

    var changeUserPassword = function (token, password, done) {
        models.User.findOne({ where: { forgotPasswordGuid: token } }).then(user => {
            if (user) {
                user.password = models.User.prototype.generateHash(password);
                user.forgotPasswordGuid = null;
                user.save().then(function (user, err) {
                    if (!err) done(null, user);
                    else done(err);
                })
                    .catch(function (err) {
                        done(err);
                    });
            }
            else done('No User');
        }).catch(function (err) {
            done(err);
        });
    }

    var validateUser = function(user, done) {
        if (!user.username) done('SIGNUP.FORM.USERNAME_NOT_NULL', null);
        if (!user.email) done('SIGNUP.FORM.EMAIL_NOT_NULL', null);
        if (!user.password) done('SIGNUP.FORM.PASSWORD_NOT_NULL', null);

        // Check that the username or email has not already been used
        getUserByEmail(user.email, function(err, u) {
            if (u) done('SIGNUP.FORM.EMAIL_TAKEN', null);
            else if (err) done(err, null);
            else getUserByUsername(user.username, function(err, u) {
                if (u) done('SIGNUP.FORM.USERNAME_TAKEN', null);
                else if (err) done(err, null);
                else done(null, true);
            });
        });
    }

    var createUser = function (user, done) {
        var token = guid.raw();
        models.User.create({
            username: user.username,
            email: user.email,
            password: models.User.prototype.generateHash(user.password),
            firstName: user.firstName,
            lastName: user.lastName,
            lang: user.lang,
            emailValidated: false,
            emailValidationGuid: token
        }).then(user => {
            done(null, user);
        }).catch(function(err) {
            done(err);
        });
    }

    var getUserById = function(id, done) {
        models.User.findOne({ where: { id: id } }).then(user => {
            done(null, user);
        }).catch(function(err) {
            done(err);
        });
    }

    var getUsersForPorfileRefresh = function(done) {
        models.User.findAll({ where: { profileRefresh: true } }).then(users => {
            done(null, users);
        }).catch(function(err) {
            done(err);
        });
    }

    var setUserProfileRefresh = function(userId, profileRefresh, done) {
        models.User.findOne({ where: { id: userId } }).then(data => {
            if (data) {
                data.profileRefresh = profileRefresh;
                data.save().then(user => {
                    done(null, user);
                });
            }
        }).catch(function(err) {
            done(err);
        });
    }

    var getUsersForQuestionnaireRefresh = function(done) {
        models.UserQuestionnaire.findAll({
            attributes: ['userId', [sequelize.fn('count', sequelize.col('movieDBId')), 'movieCount']],
            group: '"userId"',
            having: sequelize.literal('count("movieDBId") > 20')
        }).then(data => {
            var usersIds = _.map(data, 'userId');
            models.User.findAll({ where: { id: { $notIn: usersIds } } }).then(users => {
                done(null, users);
            }).catch(function(err) {
                done(err);
            });
        }).catch(function(err) {
            done(err);
        });
    }

    var getUsersForRecommandationRefresh = function(done) {
        models.MovieRecommandation.findAll({
            attributes: ['userId', [sequelize.fn('count', sequelize.col('movieDBId')), 'movieCount']],
            group: '"userId"',
            having: sequelize.literal('count("movieDBId") > 30')
        }).then(data => {
            var usersIds = _.map(data, 'userId');
            models.User.findAll({ where: { id: { $notIn: usersIds } } }).then(users => {
                done(null, users);
            }).catch(function(err) {
                done(err);
            });
        }).catch(function(err) {
            done(err);
        });
    }

    var userToModelView = function(user) {
        if (!user) return user;
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            lang: user.lang,
            yearOfBirth: user.yearOfBirth,
            firstQuestionnaireCompleted: user.firstQuestionnaireCompleted,
            country: user.country
        }
    }

    var issueToken = function(user, done) {
        var token = guid.raw();
        models.User.findOne({ where: { id: user.id } }).then(data => {
            if (data) {
                data.rememberMeCookie = token;
                data.rememberMeExpiry = new Date().setDate((new Date().getDate()) + 7);
                data.save().then(user => {
                    done(null, token);
                });
            }
        }).catch(function (err) {
            done(err);
        });
    }

    var getUserFromToken = function (token, done) {
        var Op = sequelize.Op;
        models.User.findOne({ where: { rememberMeCookie: token, rememberMeExpiry: { [Op.gt]: new Date() } } }).then(user => {
            done(null, user)
        }).catch(function (err) {
            done(err);
        });
    }

    var searchUser = function (search, done) {
        var Op = sequelize.Op;
        models.User.findOne({ where: { [Op.or]: [{ email: search }, { username: search }] } }).then(user => {
            done(null, user)
        }).catch(function (err) {
            done(err);
        });
    }

    var getDistance = function (currentUserId, userId, done) {
        var Op = sequelize.Op;
        models.UserProfile.findAll({ where: { userId: { [Op.or]: [currentUserId, userId] } } }).then(profiles => {
            var distance = {
                profiles: []
            };
            // Filter the relevant profiles
            profiles = _.filter(profiles, function (p) { return p.scoreRelevance > 50 && (p.score < 30 || p.score > 70) });
            var currentUserProfiles = _.filter(profiles, function (p) { return p.userId == currentUserId; });
            var otherUserProfiles = _.filter(profiles, function (p) { return p.userId == userId });
            _.each(currentUserProfiles, function (p) {
                // Try to find the relevant profile on the other user
                var otherUserProfile = _.find(otherUserProfiles, function (op) { return (p.genreId && op.genreId == p.genreId) || (p.castId && p.castId == op.castId) || (p.writerId && op.writerId == p.writerId) || (p.directorId && op.directorId == p.directorId) || (p.country && op.country == p.country) });
                if (otherUserProfile) {
                    distance.profiles.push({ profile: p, distance: Math.abs(p.score - otherUserProfile.score) });
                }
            });
            if (_.size(distance.profiles) > 0) {
                distance.averageDistance = _.reduce(distance.profiles, function (memo, p) {
                    return memo + p.distance;
                }, 0) / distance.profiles.length;
            }
            done(null, distance);
        }).catch(function (err) {
            done(err);
        });
    }

    var getLikedDislikedMovies = function (userId, done) {
        var Op = sequelize.Op;
        models.MovieQuestionnaire.findAll({
            where: {
                userId: userId, isSeen: true, rating: { [Op.or]: [5, 4, 1] }
            },
            order: [
                Sequelize.fn('RANDOM')
            ],
            limit: 20
        }).then(questionnaires => {
            done(null, questionnaires);
        }).catch(function (err) {
            done(err);
        });
    }


    return {
        getUserByUsername: getUserByUsername,
        getUserByEmail: getUserByEmail,
        validateUser: validateUser,
        createUser: createUser,
        getUserById: getUserById,
        getUsersForPorfileRefresh: getUsersForPorfileRefresh,
        setUserProfileRefresh: setUserProfileRefresh,
        getUsersForQuestionnaireRefresh: getUsersForQuestionnaireRefresh,
        getUsersForRecommandationRefresh: getUsersForRecommandationRefresh,
        userToModelView: userToModelView,
        issueToken: issueToken,
        getUserFromToken: getUserFromToken,
        getUserFromValidationToken: getUserFromValidationToken,
        changeUserPassword: changeUserPassword,
        searchUser: searchUser,
        getDistance: getDistance,
        getLikedDislikedMovies: getLikedDislikedMovies
    }
}

module.exports = userService;