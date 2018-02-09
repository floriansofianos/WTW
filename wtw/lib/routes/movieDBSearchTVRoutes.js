var express = require('express');
var movieDBService = require('../helpers/movieDBService')();
var movieQuestionnaireService = require('../helpers/movieQuestionnaireService')();
var movieCacheService = require('../helpers/movieCacheService')();
var userProfileService = require('../helpers/userProfileService')();
var movieRecommandationService = require('../helpers/movieRecommandationService')();
var movieSearchController = require('../controllers/movieSearchController')(movieDBService, movieQuestionnaireService, movieCacheService, userProfileService, movieRecommandationService);


var movieDBSearchTVRoutes = function () {
    var movieDBSearchTVRouter = express.Router();


    //TODO Changes here





    movieDBSearchTVRouter.route('/')
        .get(movieSearchController.search);

    return movieDBSearchRouter;
}

module.exports = movieDBSearchTVRoutes;