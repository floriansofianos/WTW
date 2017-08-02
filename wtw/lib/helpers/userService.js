var models = require('../models');

var userService = function () {

    var getUserByUsername = function (username, done) {
        models.User.findOne({ where: { username: username } }).then(user => {
            done(null, user);
        });
    }

    var getUserByEmail = function (email, done) {
        models.User.findOne({ where: { email: email } }).then(user => {
            done(null, user);
        });
    }

    var validateUser = function (user, done) {
        if (!user.username) done('SIGNUP.FORM.USERNAME_NOT_NULL', null);
        if (!user.email) done('SIGNUP.FORM.EMAIL_NOT_NULL', null);
        if (!user.password) done('SIGNUP.FORM.PASSWORD_NOT_NULL', null);

        // Check that the username or email has not already been used
        getUserByEmail(user.email, function (err, u) {
            if (u) done('SIGNUP.FORM.EMAIL_TAKEN', null);
            else if (err) done(err, null);
            else getUserByUsername(user.username, function (err, u) {
                if (u) done('SIGNUP.FORM.USERNAME_TAKEN', null);
                else if (err) done(err, null);
                else done(null, true);
            });
        });
    }

    var createUser = function (user, done) {
        models.User.create({
            username: user.username,
            email: user.email,
            password: models.User.prototype.generateHash(user.password),
            firstName: user.firstName,
            lastName: user.lastName
        }).then(user => {
            done(null, user);
        });
    }

    return {
        getUserByUsername: getUserByUsername,
        getUserByEmail: getUserByEmail,
        validateUser: validateUser,
        createUser: createUser
    }
}

module.exports = userService;