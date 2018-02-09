var express = require('express');
var movieDBService = require('../helpers/movieDBService')();
var tvQuestionnaireService = require('../helpers/tvQuestionnaireService')();
var tvCacheService = require('../helpers/tvCacheService')();
var userProfileService = require('../helpers/userProfileService')();
var tvRecommandationService = require('../helpers/tvRecommandationService')();
var tvSearchController = require('../controllers/tvSearchController')(movieDBService, tvQuestionnaireService, tvCacheService, userProfileService, tvRecommandationService);


var movieDBSearchTVRoutes = function () {
    var movieDBSearchTVRouter = express.Router();

    movieDBSearchTVRouter.route('/')
        .get(tvSearchController.search);

    movieDBSearchTVRouter.route('/wtw')
        .get(tvSearchController.wtw);

    return movieDBSearchTVRouter;
}

module.exports = movieDBSearchTVRoutes;