var express = require('express');
var isAuthenticated = require('../middlewares/isAuthenticated');
var userTVQuestionnaireService = require('../helpers/userTVQuestionnaireService')();
var tvCacheService = require('../helpers/tvCacheService')();
var tvQuestionnaireService = require('../helpers/tvQuestionnaireService')();
var userTVQuestionnaireController = require('../controllers/userTVQuestionnaireController')(userTVQuestionnaireService, tvCacheService, tvQuestionnaireService);

var userTVQuestionnaireRoutes = function () {
    var userTVQuestionnaireRouter = express.Router();

    userTVQuestionnaireRouter.route('/')
        .get(isAuthenticated, userTVQuestionnaireController.get);

    return userTVQuestionnaireRouter;
}

module.exports = userTVQuestionnaireRoutes;