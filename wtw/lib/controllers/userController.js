var postmarkService = require('../helpers/postmarkService')();
var guid = require('guid');
var _ = require('underscore');

var userController = function (userService) {
    var isUsernameAlreadyUsed = function (req, res) {
        if (req.query.username) {
            userService.getUserByUsername(req.query.username, function (err, user) {
                if (!err) res.json({ username: req.query.username, isTaken: user != undefined });
                else res.send(500);
            });
        }
        else res.send(400);
    }

    var isEmailAlreadyUsed = function (req, res) {
        if (req.query.email) {
            userService.getUserByEmail(req.query.email, function (err, user) {
                if (!err) res.json({ email: req.query.email, isTaken: user != undefined });
                else res.send(500);
            });
        }
        else res.send(400);
    }

    var createUser = function (req, res) {
        var userValidation = userService.validateUser(req.body, function (err, valid) {
            if (valid) {
                userService.createUser(req.body, function (err, user) {
                    if (user) {
                        postmarkService.sendWelcomeEmail(user.lang, user.email, user.username, (process.env.URL ? process.env.URL : 'http://localhost:1337') + 'auth/verifyEmail?validationToken=' + user.emailValidationGuid);
                        res.json(userService.userToModelView(user));
                    }
                    else res.send(500);
                });
            }
            else res.status(400).send(err)
        });
    }

    var verifyEmail = function (req, res) {
        userService.getUserFromValidationToken(req.query.validationToken, function (err, user) {
            if (user) {
                user.emailValidated = true;
                user.save().then(function (user, err) {
                    if (!err) res.redirect('../login');
                    else res.send(500);
                })
                    .catch(function (err) {
                        next(err);
                    });
            }
            else res.status(400).send(err);
        });
    }

    var sendForgotPasswordEmail = function (req, res) {
        if (req.query.email) {
            userService.getUserByEmail(req.query.email, function (err, user) {
                if (user) {
                    var token = guid.raw();
                    user.forgotPasswordGuid = token;
                    user.save().then(function (user, err) {
                        if (!err) {
                            postmarkService.sendForgotPasswordEmail(user.lang, user.email, user.username, (process.env.URL ? process.env.URL : 'http://localhost:1337') + '/auth/changePassword?token=' + user.forgotPasswordGuid);
                            res.send({success: true});
                        }
                        else res.send(500);
                    })
                        .catch(function (err) {
                            next(err);
                        });
                }
                else res.status(400).send(err);
            });
        }
        else return res.send(400);
    }

    var setNewPassword = function (req, res) {
        if (req.query.token && req.query.password) {
            userService.changeUserPassword(req.query.token, req.query.password, function (err, user) {
                if (user) {
                    res.json({ success: true });
                }
                else return res.send(400);
            });
        }
        else return res.send(400);
    }

    var updateUser = function (req, res, next) {
        userService.getUserById(req.user.id, function (err, user) {
            if (!err) {
                if (req.body.lang) user.lang = req.body.lang;
                if (req.body.yearOfBirth) user.yearOfBirth = req.body.yearOfBirth;
                if (req.body.country) user.country = req.body.country;
                if (req.body.firstName) user.firstName = req.body.firstName;
                if (req.body.lastName) user.lastName = req.body.lastName;
                if (req.body.firstQuestionnaireCompleted) user.firstQuestionnaireCompleted = req.body.firstQuestionnaireCompleted;
                user.save().then(function (user, err) {
                    if (!err) res.json(userService.userToModelView(req.user));
                    else res.send(500);
                })
                .catch(function (err) {
                    next(err);
                });
            }
            else res.send(500);
        });
    }

    var sendWelcomeEmail = function (req, res) {
        if (req.query.email) {
            userService.getUserByEmail(req.query.email, function (err, user) {
                if (user) {
                    postmarkService.sendWelcomeEmail(user.lang, user.email, user.username, (process.env.URL ? process.env.URL : 'http://localhost:1337') + '/auth/verifyEmail?validationToken=' + user.emailValidationGuid);
                    res.json({success: true});
                }
                else return res.send(400);
            });
        }
        else return res.send(400);
    }

    var search = function (req, res) {
        if (req.query.search) {
            userService.searchUser(req.query.search, function (err, user) {
                if (user) {
                    res.json(userService.userToModelView(user));
                }
                else return res.json({ success: false });
            });
        }
        else return res.send(400);
    }

    var getUserProfile = function (req, res) {
        if (req.params.userId) {
            userService.getUserById(req.params.userId, function (err, user) {
                if (user) {
                    var result = {
                        user: userService.userToModelView(user)
                    };
                    userService.getLikedDislikedMovies(req.params.userId, function (err, questionnaires) {
                        if (questionnaires) {
                            result.questionnaires = questionnaires;
                            res.json(result);
                        }
                        else return res.send(400);
                    });
                }
                else return res.send(400);
            });
        }
        else return res.send(400);
    }

    var getAllUserInformations = function (req, res) {
        if (req.query.userIds) {
            userService.getUserByIds(req.query.userIds, function (err, users) {
                if (users) {
                    var result = {
                        users: _.map(users, function (u) { return userService.userToModelView(u); })
                    };
                    res.send(result);
                }
                else return res.send(400);
            });
        }
        else return res.send(400);
    }

    var getUserDistance = function (req, res) {
        if (req.params.userId) {
            userService.getDistance(req.user.id, req.params.userId, function (err, distance) {
                if (distance) {
                    res.json(distance);
                }
                else return res.send(400);
            });
        }
        else return res.send(400);
    }

    return {
        isUsernameAlreadyUsed: isUsernameAlreadyUsed,
        isEmailAlreadyUsed: isEmailAlreadyUsed,
        createUser: createUser,
        updateUser: updateUser,
        verifyEmail: verifyEmail,
        sendForgotPasswordEmail: sendForgotPasswordEmail,
        setNewPassword: setNewPassword,
        sendWelcomeEmail: sendWelcomeEmail,
        search: search,
        getUserProfile: getUserProfile,
        getUserDistance: getUserDistance,
        getAllUserInformations: getAllUserInformations
    }
}

module.exports = userController;