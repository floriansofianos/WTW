var express = require('express');
var movieDBService = require('../helpers/movieDBService')();
var tvCacheService = require('../helpers/tvCacheService')();
var plexService = require('../helpers/plexService')();
var tvshowController = require('../controllers/tvshowController')(movieDBService, tvCacheService, plexService);


var tvshowRoutes = function () {
    var tvshowRouter = express.Router();

    tvshowRouter.route('/')
        .get(tvshowController.get);

    tvshowRouter.route('/plex')
        .get(tvshowController.checkPlex);

    return tvshowRouter;
}

module.exports = tvshowRoutes;