var express = require('express');
var isAuthenticated = require('../middlewares/isAuthenticated');
var notificationService = require('../helpers/notificationService')();
var notificationController = require('../controllers/notificationController')(notificationService);

var notificationRoutes = function () {
    var notificationRouter = express.Router();

    notificationRouter.route('/')
        .get(isAuthenticated, notificationController.getAll);

    notificationRouter.route('/read')
        .post(isAuthenticated, notificationController.readAllReadOnly);

    return notificationRouter;
}

module.exports = notificationRoutes;