var express = require('express');
var isAuthenticated = require('../middlewares/isAuthenticated')

var adminRoutes = function () {
    var adminRouter = express.Router();

    adminRouter.route('/')
        .get(isAuthenticated, function (req, res) {
            res.json({ test: 'Only for authenticated users' });
        });

    return adminRouter;
}

module.exports = adminRoutes;