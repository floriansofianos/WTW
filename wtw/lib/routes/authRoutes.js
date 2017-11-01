var express = require('express');
var passport = require('passport');
var userService = require('../helpers/userService')();
var userController = require('../controllers/userController')(userService);
var isAuthenticated = require('../middlewares/isAuthenticated')

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
        .get(function (req, res) {
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

    return authRouter;
}

module.exports = authRoutes;