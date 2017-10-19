var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../models');

module.exports = function () {
    passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
     },
        function (req, email, password, done) {
         // check in mongo if a user with username exists or not
            models.User.findOne({ where: { 'email': email } }).then(function (user) {

                if (!user) {
                    return done(null, false, {
                        message: 'Email does not exist'
                    });
                }

                if (!isValidPassword(user, password)) {

                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }

                return done(null, user);
            }).catch(function (err) {

                console.log("Error:", err);

                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });

            });
        }));

    var isValidPassword = function (user, password) {
        return models.User.validPassword(password, user.password);
    }
}