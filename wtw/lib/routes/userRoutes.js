var express = require('express');
var isAuthenticated = require('../middlewares/isAuthenticated');
var userService = require('../helpers/userService')();
var userController = require('../controllers/userController')(userService);

var userRoutes = function () {
    var userRouter = express.Router();

    userRouter.route('/')
        .get(isAuthenticated, userController.search);

    userRouter.route('/:userId')
        .get(isAuthenticated, userController.getUserProfile);

    return userRouter;
}

module.exports = userRoutes;