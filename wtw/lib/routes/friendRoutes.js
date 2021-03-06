﻿var express = require('express');
var isAuthenticated = require('../middlewares/isAuthenticated');
var friendService = require('../helpers/friendshipService')();
var userService = require('../helpers/userService')();
var notificationService = require('../helpers/notificationService')();
var timelineEventService = require('../helpers/timelineEventService')();
var friendController = require('../controllers/friendController')(friendService, userService, notificationService, timelineEventService);

var friendRoutes = function () {
    var friendRouter = express.Router();

    friendRouter.route('/')
        .get(isAuthenticated, friendController.getAll); 

    friendRouter.route('/:id')
        .get(isAuthenticated, friendController.get)
        .post(isAuthenticated, friendController.post)
        .delete(isAuthenticated, friendController.deleteFriend);

    friendRouter.route('/pending/:id')
        .get(isAuthenticated, friendController.getPending)
        .delete(isAuthenticated, friendController.deletePendingFriend);

    friendRouter.route('/accept/:id')
        .post(isAuthenticated, friendController.acceptFriendRequest);
    friendRouter.route('/refuse/:id')
        .post(isAuthenticated, friendController.refuseFriendRequest)

    return friendRouter;
}

module.exports = friendRoutes;