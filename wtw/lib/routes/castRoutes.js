var express = require('express');
var isAuthenticated = require('../middlewares/isAuthenticated');
var movieDBService = require('../helpers/movieDBService')();
var castController = require('../controllers/castController')(movieDBService);

var castRoutes = function () {
    var castRouter = express.Router();

    castRouter.route('/')
        .get(isAuthenticated, castController.get);

    return castRouter;
}

module.exports = castRoutes;