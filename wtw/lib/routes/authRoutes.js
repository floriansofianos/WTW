var express = require('express');

var authRoutes = function () {
    var authRouter = express.Router();

    authRouter.route('/signin')
        .post(function (req, res) {
            
        });

    authRouter.route('/signup')
        .post(function (req, res) {

        });

    return authRouter;
}

module.exports = authRoutes;