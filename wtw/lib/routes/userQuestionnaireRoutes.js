var express = require('express');
var isAuthenticated = require('../middlewares/isAuthenticated');
var userQuestionnaireService = require('../helpers/userQuestionnaireService')();
var movieDBService = require('../helpers/movieDBService')();
var userQuestionnaireController = require('../controllers/userQuestionnaireController')(userQuestionnaireService, movieDBService);

var userQuestionnaireRoutes = function () {
    var userQuestionnaireRouter = express.Router();

    userQuestionnaireRouter.route('/')
        .get(isAuthenticated, userQuestionnaireController.get);

    return userQuestionnaireRouter;
}

module.exports = userQuestionnaireRoutes;