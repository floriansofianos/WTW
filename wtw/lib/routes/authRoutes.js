var express = require('express');
var passport = require('passport');

var authRoutes = function () {
    var authRouter = express.Router();

    authRouter.route('/signin')
        .post(passport.authenticate('local'), function(req, res) {
            res.json(req.user);
        });

    authRouter.route('/signup')
        .post(function (req, res) {

        });

    return authRouter;
}

module.exports = authRoutes;