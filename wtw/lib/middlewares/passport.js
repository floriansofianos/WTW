var passport = require('passport');
var models = require('../models');

module.exports = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(passport.authenticate('remember-me'));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        models.User.findById(id).then(function (user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        }).catch(function(err) {
            done(err);
        });
    });

    require('../middlewares/passport.local.strategy')();
    require('../middlewares/passport.rememberme.strategy')();
}
