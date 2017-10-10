var express = require('express');
var movieDBService = require('../helpers/movieDBService')();
var movieSearchController = require('../controllers/movieSearchController')(movieDBService);


var movieDBSearchRoutes = function () {
    var movieDBSearchRouter = express.Router();

    movieDBSearchRouter.route('/')
        .get(movieSearchController.search);

    movieDBSearchRouter.route('/wtw')
        .get(movieSearchController.wtw);

    return movieDBSearchRouter;
}

module.exports = movieDBSearchRoutes;