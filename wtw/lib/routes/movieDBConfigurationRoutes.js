var express = require('express');
var movieDBService = require('../helpers/movieDBService')();

var movieDBConfigurationRoutes = function () {
	var movieDBConfigurationRouter = express.Router();

	movieDBConfigurationRouter.route('/')
        .get(function (req, res) {
        	res.json(movieDBService.getConfiguration());
        });

	return movieDBConfigurationRouter;
}

module.exports = movieDBConfigurationRoutes;