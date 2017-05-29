var express = require('express');

var authRoutes = function () {
    var authRouter = express.Router();

    authRouter.route('/auth/signin')
        .post(function (req, res) {
            
        });

    authRouter.route('/auth/signup')
        .post(function (req, res) {

        });

    return testRouter;
}

module.exports = authRoutes;