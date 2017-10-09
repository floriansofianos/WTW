var express = require('express');
var movieDBService = require('../helpers/movieDBService')();
var movieDBGenresController = require('../controllers/movieDBGenresController')(movieDBService);


var movieDBGenresRoutes = function () {
    var movieDBGenresRouter = express.Router();

    movieDBGenresRouter.route('/')
        .get(movieDBGenresController.getAll);

    return movieDBGenresRouter;
}

module.exports = movieDBGenresRoutes;