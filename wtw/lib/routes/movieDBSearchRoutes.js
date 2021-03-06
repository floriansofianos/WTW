﻿var express = require('express');
var movieDBService = require('../helpers/movieDBService')();
var movieQuestionnaireService = require('../helpers/movieQuestionnaireService')();
var movieCacheService = require('../helpers/movieCacheService')();
var isAuthenticated = require('../middlewares/isAuthenticated');
var userProfileService = require('../helpers/userProfileService')();
var movieRecommandationService = require('../helpers/movieRecommandationService')();
var movieSearchController = require('../controllers/movieSearchController')(movieDBService, movieQuestionnaireService, movieCacheService, userProfileService, movieRecommandationService);


var movieDBSearchRoutes = function () {
    var movieDBSearchRouter = express.Router();

    movieDBSearchRouter.route('/')
        .get(movieSearchController.search);

    movieDBSearchRouter.route('/wtw')
        .get(isAuthenticated, movieSearchController.wtw);

    return movieDBSearchRouter;
}

module.exports = movieDBSearchRoutes;