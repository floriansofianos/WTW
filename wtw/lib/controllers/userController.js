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
                if (!err) res.json({ email: req.query.email, isTaken: user != undefined });
                else res.send(500);
            });
        }
        else res.send(400);
    }

    var createUser = function (req, res) {
        var userValidation = userService.validateUser(req.body);
        if (userValidation.isValid) {
            userService.createUser(req.body, function (err, user) {
                if (user) res.json(user);
                else res.send(500);
            });
        }
        else res.status(400).send(userValidation.error)
    }

    return {
        isUsernameAlreadyUsed: isUsernameAlreadyUsed,
        isEmailAlreadyUsed: isEmailAlreadyUsed
    }
}

module.exports = userController;