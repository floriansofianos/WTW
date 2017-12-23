﻿var express = require('express');
var isAuthenticated = require('../middlewares/isAuthenticated');
var userService = require('../helpers/userService')();
var movieQuestionnaireService = require('../helpers/movieQuestionnaireService')();
var timelineEventService = require('../helpers/timelineEventService')();
var userController = require('../controllers/userController')(userService);
var avatarController = require('../controllers/avatarController')();
var movieQuestionnaireController = require('../controllers/movieQuestionnaireController')(movieQuestionnaireService, timelineEventService);

var userRoutes = function () {
    var userRouter = express.Router();

    userRouter.route('/')
        .get(isAuthenticated, userController.search);

    userRouter.route('/usersThatLiked')
        .get(isAuthenticated, movieQuestionnaireController.getUsersThatAlsoLiked);

    userRouter.route('/avatar')
        .post(isAuthenticated, avatarController.create)
        .delete(isAuthenticated, avatarController.deleteAvatar);

    userRouter.route('/friends')
        .get(isAuthenticated, userController.getAllFriends);

    userRouter.route('/avatar/:userId')
        .get(isAuthenticated, avatarController.get);

    userRouter.route('/distance/:userId')
        .get(isAuthenticated, userController.getUserDistance);

    userRouter.route('/profiles')
        .get(isAuthenticated, userController.getAllUserInformations);

    userRouter.route('/:userId')
        .get(isAuthenticated, userController.getUserProfile);

    return userRouter;
}

module.exports = userRoutes;