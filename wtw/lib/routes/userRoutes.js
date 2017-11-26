var express = require('express');
var isAuthenticated = require('../middlewares/isAuthenticated');
var userService = require('../helpers/userService')();
var movieQuestionnaireService = require('../helpers/movieQuestionnaireService')();
var userController = require('../controllers/userController')(userService);
var movieQuestionnaireController = require('../controllers/movieQuestionnaireController')(movieQuestionnaireService);

var userRoutes = function () {
    var userRouter = express.Router();

    userRouter.route('/')
        .get(isAuthenticated, userController.search);

    userRouter.route('/usersThatLiked')
        .get(isAuthenticated, movieQuestionnaireController.getUsersThatAlsoLiked);

    userRouter.route('/:userId')
        .get(isAuthenticated, userController.getUserProfile);

    return userRouter;
}

module.exports = userRoutes;