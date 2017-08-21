var express = require('express');
var isAuthenticated = require('../middlewares/isAuthenticated');
var movieQuestionnaireService = require('../helpers/userService')();
var movieQuestionnaireController = require('../controllers/movieQuestionnaireController')(movieQuestionnaireService);

var movieQuestionnaireRoutes = function () {
    var movieQuestionnaireRouter = express.Router();

    movieQuestionnaireRouter.route('/')
        .get(isAuthenticated, movieQuestionnaireController.getAll)
        .post(isAuthenticated, movieQuestionnaireController.create);

    return movieQuestionnaireRouter;
}

module.exports = movieQuestionnaireRoutes;