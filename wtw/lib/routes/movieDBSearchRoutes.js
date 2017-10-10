var express = require('express');
var movieDBService = require('../helpers/movieDBService')();
var movieQuestionnaireService = require('../helpers/movieQuestionnaireService')();
var movieCacheService = require('../helpers/movieCacheService')();
var movieSearchController = require('../controllers/movieSearchController')(movieDBService, movieQuestionnaireService, movieCacheService);


var movieDBSearchRoutes = function () {
    var movieDBSearchRouter = express.Router();

    movieDBSearchRouter.route('/')
        .get(movieSearchController.search);

    movieDBSearchRouter.route('/wtw')
        .get(movieSearchController.wtw);

    return movieDBSearchRouter;
}

module.exports = movieDBSearchRoutes;