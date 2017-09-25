var express = require('express');
var movieDBService = require('../helpers/movieDBService')();
var movieController = require('../controllers/movieController')(movieDBService);


var movieRoutes = function () {
    var movieRouter = express.Router();

    movieRouter.route('/')
        .get(movieController.get);

    return movieRouter;
}

module.exports = movieRoutes;