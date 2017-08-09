var express = require('express');
var movieDBService = require('../helpers/movieDBService')();
var firstQuestionnaireController = require('../controllers/firstQuestionnaireController')(movieDBService);

var firstQuestionnaireRoutes = function () {
    var firstQuestionnaireRouter = express.Router();

    firstQuestionnaireRouter.route('/')
        .get(firstQuestionnaireController.getMovie);

    return firstQuestionnaireRouter;
}

module.exports = firstQuestionnaireRoutes;