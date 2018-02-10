var express = require('express');
var isAuthenticated = require('../middlewares/isAuthenticated');
var tvRecommandationService = require('../helpers/movieRecommandationService')();
var userProfileService = require('../helpers/userProfileService')();
var tvCacheService = require('../helpers/tvCacheService')();
var tvRecommandationController = require('../controllers/tvRecommandationController')(tvRecommandationService, tvCacheService, userProfileService);

var tvRecommandationRoutes = function () {
    var tvRecommandationRouter = express.Router();

    tvRecommandationRouter.route('/')
        .get(isAuthenticated, tvRecommandationController.getAll);

    tvRecommandationRouter.route('/score')
        .get(isAuthenticated, tvRecommandationController.get);

    return tvRecommandationRouter;
}

module.exports = tvRecommandationRoutes;