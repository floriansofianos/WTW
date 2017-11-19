var express = require('express');
var isAuthenticated = require('../middlewares/isAuthenticated');
var followingController = require('../controllers/followingController')();

var followingRoutes = function () {
    var followingRouter = express.Router();

    followingRouter.route('/')
        .post(isAuthenticated, followingController.post);

    followingRouter.route('/:id')
        .delete(isAuthenticated, followingController.deleteFollowing);

    return followingRouter;
}

module.exports = followingRoutes;