var express = require('express');
var movieDBService = require('../helpers/movieDBService')();
var movieSearchController = require('../controllers/movieSearchController')(movieDBService);


var movieDBSearchRoutes = function () {
    var movieDBSearchRouter = express.Router();

    movieDBSearchRouter.route('/')
        .get(movieSearchController.search);

    return movieDBSearchRouter;
}

module.exports = movieDBSearchRoutes;