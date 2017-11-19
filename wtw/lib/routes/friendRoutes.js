var express = require('express');
var isAuthenticated = require('../middlewares/isAuthenticated');
var friendController = require('../controllers/friendController')();

var friendRoutes = function () {
    var friendRouter = express.Router();

    friendRouter.route('/')
        .post(isAuthenticated, friendController.post);

    friendRouter.route('/:id')
        .delete(isAuthenticated, friendController.deleteFriend);

    return friendRouter;
}

module.exports = friendRoutes;