var userController = function (userService) {
    var isUsernameAlreadyUsed = function (req, res) {
        if (req.query.username) {
            userService.getUserByUsername(req.query.username, function (err, user) {
                if (!err) res.json({ username: req.query.username, isTaken: user != undefined });
                else res.send(500);
            });
        }
        else res.send(400);
    }

    var isEmailAlreadyUsed = function (req, res) {
        if (req.query.email) {
            userService.getUserByEmail(req.query.email, function (err, user) {
                
            });
        }
        else res.send(400);
    }

    var createUser = function (req, res) {
        var userValidation = userService.validateUser(req.body, function (err, valid) {
            if (valid) {
                userService.createUser(req.body, function (err, user) {
                    if (user) res.json(user);
                    else res.send(500);
                });
            }
            else res.status(400).send(err)
        });
    }

    var updateUser = function (req, res) {
        userService.getUserById(req.user.id, function (err, user) {
            if (!err) {
                if (req.body.lang) user.lang = req.body.lang;
                user.save().then(function (user, err) {
                    if (!err) res.json(req.user);
                    else res.send(500);
                });
            }
            else res.send(500);
        });
    }

    return {
        isUsernameAlreadyUsed: isUsernameAlreadyUsed,
        isEmailAlreadyUsed: isEmailAlreadyUsed,
        createUser: createUser,
        updateUser: updateUser
    }
}

module.exports = userController;