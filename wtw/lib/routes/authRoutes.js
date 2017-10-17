var express = require('express');
var passport = require('passport');
var userService = require('../helpers/userService')();
var userController = require('../controllers/userController')(userService);
var isAuthenticated = require('../middlewares/isAuthenticated')

var authRoutes = function () {
    var authRouter = express.Router();

    authRouter.route('/signin')
        .post(passport.authenticate('local'), function(req, res) {
            res.json(userService.userToModelView(req.user));
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

    return authRouter;
}

module.exports = authRoutes;