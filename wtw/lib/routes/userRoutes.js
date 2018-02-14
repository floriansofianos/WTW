var express = require('express');
var isAuthenticated = require('../middlewares/isAuthenticated');
var userService = require('../helpers/userService')();
var userProfileService = require('../helpers/userProfileService')();
var movieQuestionnaireService = require('../helpers/movieQuestionnaireService')();
var tvQuestionnaireService = require('../helpers/tvQuestionnaireService')();
var timelineEventService = require('../helpers/timelineEventService')();
var userController = require('../controllers/userController')(userService, userProfileService);
var avatarController = require('../controllers/avatarController')();
var movieQuestionnaireController = require('../controllers/movieQuestionnaireController')(movieQuestionnaireService, timelineEventService);
var tvQuestionnaireController = require('../controllers/tvQuestionnaireController')(tvQuestionnaireService, timelineEventService);

var userRoutes = function () {
    var userRouter = express.Router();

    userRouter.route('/')
        .get(isAuthenticated, userController.search);

    userRouter.route('/usersThatLiked')
        .get(isAuthenticated, movieQuestionnaireController.getUsersThatAlsoLiked);

    userRouter.route('/usersThatTVLiked')
        .get(isAuthenticated, tvQuestionnaireController.getUsersThatAlsoLiked);

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

    userRouter.route('/hasEnoughProfiles')
        .get(isAuthenticated, userController.hasEnoughProfiles);

    userRouter.route('/:userId')
        .get(isAuthenticated, userController.getUserProfile);

    return userRouter;
}

module.exports = userRoutes;