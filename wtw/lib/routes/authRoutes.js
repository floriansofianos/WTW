var express = require('express');
var passport = require('passport');
var userService = require('../helpers/userService')();
var userProfileService = require('../helpers/userProfileService')();
var library = require('../helpers/library')();
var userController = require('../controllers/userController')(userService, userProfileService);
var isAuthenticated = require('../middlewares/isAuthenticated');
var models = require('../models');

var authRoutes = function () {
    var authRouter = express.Router();

    authRouter.route('/signin')
        .post(passport.authenticate('local'), function (req, res, next) {
            // Issue a remember me cookie if the option was checked
            if (!req.body.remember_me) { return next(); }

            userService.issueToken(req.user, function (err, token) {
                if (err) { return next(err); }
                res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 });
                return next();
            });
        }, function(req, res) {
            res.json(userService.userToModelView(req.user));
        });

    authRouter.route('/signout')
        .get(function (req, res) {
            // clear the remember me cookie when logging out
            res.clearCookie('remember_me');
            req.logout();
            res.redirect('/');
        });

    authRouter.route('/current')
        .get(isAuthenticated, function (req, res) {
            res.json(userService.userToModelView(req.user));
        })
        .put(isAuthenticated, userController.updateUser);

    authRouter.route('/checkUsername')
        .get(userController.isUsernameAlreadyUsed);

    authRouter.route('/checkEmail')
        .get(userController.isEmailAlreadyUsed);

    authRouter.route('/signup')
        .post(userController.createUser);

    authRouter.route('/verifyEmail')
        .get(userController.verifyEmail);

    authRouter.route('/forgotPassword')
        .get(userController.sendForgotPasswordEmail);

    authRouter.route('/sendWelcomeEmail')
        .get(userController.sendWelcomeEmail);

    authRouter.route('/newPassword')
        .get(userController.setNewPassword);

    authRouter.route('/token').post(function (req, res) {
        if (req.body.email && req.body.password) {
            var email = req.body.email;
            var password = req.body.password;
            models.User.findOne({ where: { 'email': email } }).then(function (user) {

                if (!user) {
                    res.sendStatus(401);
                }

                if (!isValidPassword(user, password)) {
                    res.status(401).send('EMAIL_PASSWORD_INCORRECT');
                }

                if (!user.emailValidated) {
                    res.status(500).send('EMAIL_NOT_VALIDATED');
                }

                // Authentication successful - send token
                res.json({
                    token: library.encodeJWT(user.id)
                });

            }).catch(function (err) {
                res.sendStatus(500);
            });
        }
    });

    var isValidPassword = function (user, password) {
        return models.User.validPassword(password, user.password);
    }

    return authRouter;
}

module.exports = authRoutes;