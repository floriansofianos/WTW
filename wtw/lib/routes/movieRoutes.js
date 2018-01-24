var express = require('express');
var movieDBService = require('../helpers/movieDBService')();
var movieCacheService = require('../helpers/movieCacheService')();
var plexService = require('../helpers/plexService')();
var movieController = require('../controllers/movieController')(movieDBService, movieCacheService, plexService);


var movieRoutes = function () {
    var movieRouter = express.Router();

    movieRouter.route('/')
        .get(movieController.get);

    movieRouter.route('/plex')
        .get(movieController.checkPlex);

    return movieRouter;
}

module.exports = movieRoutes;