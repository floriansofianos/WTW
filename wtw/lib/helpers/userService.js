var models = require('../models');

var userService = {
    getUserByUsername: function (username, done) {
        models.User.findOne({ where: { username: username } }).then(user => {
            done(null, user);
        });
    },
    getUserByEmail: function (email, done) {
        models.User.findOne({ where: { email: email } }).then(user => {
            done(null, user);
        });
    },
    validateUser: function (user) {
        if (!user.username) return { isValid: false, error: 'USERNAME_NOT_NULL' };
        if (!user.email) return { isValid: false, error: 'EMAIL_NOT_NULL' };
        if (!user.password) return { isValid: false, error: 'PASSWORD_NOT_NULL' };

        // Check that the username or email has not already been used
        getUserByEmail(user.email, function (err, user) {
            if (user) return { isValid: false, error: 'EMAIL_TAKEN' };
            else if (err) return { isValid: false, error: err }
            else getUserByUsername(user.username, function (err, user) {
                if (user) return { isValid: false, error: 'USERNAME_TAKEN' };
                else if (err) return { isValid: false, error: err }
                else return { isValid: true };
            });
        });
    },
    createUser: function (user, done) {
        models.User.create({
            username: user.username,
            email: user.email,
            password: models.User.generateHash(user.password),
            firstName: user.firstName,
            lastName: user.lastName
        }).then(user => {
            done(null, user);
        });
    }
}

module.exports = userService;