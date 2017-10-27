var postmarkService = require('../helpers/postmarkService')();

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
                        postmarkService.sendWelcomeEmail(user.lang, user.email, user.username, 'localhost:1337/auth/verifyEmail?validationToken=' + user.emailValidationGuid);
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

    var updateUser = function (req, res, next) {
        userService.getUserById(req.user.id, function (err, user) {
            if (!err) {
                if (req.body.lang) user.lang = req.body.lang;
                if (req.body.age) user.age = req.body.age;
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

    return {
        isUsernameAlreadyUsed: isUsernameAlreadyUsed,
        isEmailAlreadyUsed: isEmailAlreadyUsed,
        createUser: createUser,
        updateUser: updateUser,
        verifyEmail: verifyEmail
    }
}

module.exports = userController;