var express = require('express');
var passport = require('passport');
var userService = require('../helpers/userService');
var userController = require('../controllers/userController')(userService);

var authRoutes = function () {
    var authRouter = express.Router();

    authRouter.route('/signin')
        .post(passport.authenticate('local'), function(req, res) {
            res.json(req.user);
        });

    authRouter.route('/checkUsername')
        .get(userController.isUsernameAlreadyUsed);

    authRouter.route('/checkEmail')
        .get(userController.isEmailAlreadyUsed);

    authRouter.route('/signup')
        .post(function (req, res) {
            req.username
        });

    return authRouter;
}

module.exports = authRoutes;