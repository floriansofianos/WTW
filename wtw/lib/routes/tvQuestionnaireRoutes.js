var express = require('express');
var isAuthenticated = require('../middlewares/isAuthenticated');
var tvQuestionnaireService = require('../helpers/tvQuestionnaireService')();
var timelineEventService = require('../helpers/timelineEventService')();
var tvQuestionnaireController = require('../controllers/tvQuestionnaireController')(tvQuestionnaireService, timelineEventService);

var tvQuestionnaireRoutes = function () {
    var tvQuestionnaireRouter = express.Router();

    tvQuestionnaireRouter.route('/')
        .get(isAuthenticated, tvQuestionnaireController.getAll)
        .post(isAuthenticated, tvQuestionnaireController.createOrUpdate);

    tvQuestionnaireRouter.route('/:id')
        .get(isAuthenticated, tvQuestionnaireController.get);

    return tvQuestionnaireRouter;
}

module.exports = tvQuestionnaireRoutes;