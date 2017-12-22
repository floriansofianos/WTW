var express = require('express');
var isAuthenticated = require('../middlewares/isAuthenticated');
var timelineEventService = require('../helpers/timelineEventService')();
var friendshipService = require('../helpers/friendshipService')();
var timelineEventController = require('../controllers/timelineEventController')(timelineEventService, friendshipService);

var timelineEventRoutes = function () {
    var timelineEventRouter = express.Router();

    timelineEventRouter.route('/')
        .get(isAuthenticated, timelineEventController.getPage);

    return timelineEventRouter;
}

module.exports = timelineEventRoutes;