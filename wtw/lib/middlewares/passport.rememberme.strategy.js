var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
var RememberMeStrategy = require('passport-remember-me').Strategy;
var userService = require('../helpers/userService')();

module.exports = function () {
    passport.use(new RememberMeStrategy(
        function (token, done) {
            userService.getUserFromToken(token, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                return done(null, user);
            });
        },
        userService.issueToken
    ));
}