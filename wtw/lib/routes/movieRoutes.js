var express = require('express');
var movieDBService = require('../helpers/movieDBService')();
var movieCacheService = require('../helpers/movieCacheService')();
var isAuthenticated = require('../middlewares/isAuthenticated');
var plexService = require('../helpers/plexService')();
var movieController = require('../controllers/movieController')(movieDBService, movieCacheService, plexService);


var movieRoutes = function () {
    var movieRouter = express.Router();

    movieRouter.route('/')
        .get(movieController.get);

    movieRouter.route('/plex')
        .get(isAuthenticated, movieController.checkPlex);

    return movieRouter;
}

module.exports = movieRoutes;