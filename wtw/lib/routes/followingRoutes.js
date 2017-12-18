var express = require('express');
var isAuthenticated = require('../middlewares/isAuthenticated');
var friendService = require('../helpers/friendshipService')();
var notificationService = require('../helpers/notificationService')();
var userService = require('../helpers/userService')();
var followingController = require('../controllers/followingController')(friendService, userService, notificationService);

var followingRoutes = function () {
    var followingRouter = express.Router();

    followingRouter.route('/:id')
        .post(isAuthenticated, followingController.post)
        .delete(isAuthenticated, followingController.deleteFollowing);

    return followingRouter;
}

module.exports = followingRoutes;