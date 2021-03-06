﻿var express = require('express');
var movieDBService = require('../helpers/movieDBService')();
var isAuthenticated = require('../middlewares/isAuthenticated');
var movieQuestionnaireService = require('../helpers/movieQuestionnaireService')();
var movieLanguageService = require('../helpers/movieLanguageService')();
var firstQuestionnaireController = require('../controllers/firstQuestionnaireController')(movieDBService, movieQuestionnaireService, movieLanguageService);

var firstQuestionnaireRoutes = function () {
    var firstQuestionnaireRouter = express.Router();

    firstQuestionnaireRouter.route('/')
        .get(isAuthenticated, firstQuestionnaireController.getMovie);

    return firstQuestionnaireRouter;
}

module.exports = firstQuestionnaireRoutes;