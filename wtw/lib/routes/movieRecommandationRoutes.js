var express = require('express');
var isAuthenticated = require('../middlewares/isAuthenticated');
var movieRecommandationService = require('../helpers/movieRecommandationService')();
var movieRecommandationController = require('../controllers/movieRecommandationController')(movieRecommandationService);

var movieRecommandationRoutes = function () {
    var movieRecommandationRouter = express.Router();

    movieRecommandationRouter.route('/')
        .get(isAuthenticated, movieRecommandationController.getAll);

    return movieRecommandationRouter;
}

module.exports = movieRecommandationRoutes;