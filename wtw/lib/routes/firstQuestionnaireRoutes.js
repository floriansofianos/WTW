var express = require('express');
var movieDBService = require('../helpers/movieDBService')();
var movieQuestionnaireService = require('../helpers/movieQuestionnaireService')();
var firstQuestionnaireController = require('../controllers/firstQuestionnaireController')(movieDBService, movieQuestionnaireService);

var firstQuestionnaireRoutes = function () {
    var firstQuestionnaireRouter = express.Router();

    firstQuestionnaireRouter.route('/')
        .get(firstQuestionnaireController.getMovie);

    return firstQuestionnaireRouter;
}

module.exports = firstQuestionnaireRoutes;