var express = require('express');
var isAuthenticated = require('../middlewares/isAuthenticated');
var movieRecommandationService = require('../helpers/movieRecommandationService')();
var userProfileService = require('../helpers/userProfileService')();
var movieDBService = require('../helpers/movieDBService')();
var movieRecommandationController = require('../controllers/movieRecommandationController')(movieRecommandationService, movieDBService, userProfileService);

var movieRecommandationRoutes = function () {
    var movieRecommandationRouter = express.Router();

    movieRecommandationRouter.route('/')
        .get(isAuthenticated, movieRecommandationController.getAll);

    movieRecommandationRouter.route('/score')
        .get(isAuthenticated, movieRecommandationController.get);

    return movieRecommandationRouter;
}

module.exports = movieRecommandationRoutes;