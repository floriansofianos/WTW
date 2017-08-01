var models = require('../models');

var userService = {
    getUserByUsername: function (username, done) {
        models.User.findOne({ where: { username: username } }).then(user => {
            done(null, user);
        });
    }
}

module.exports = userService;