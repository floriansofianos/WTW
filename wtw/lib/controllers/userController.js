var userController = function (userService) {
    var isUsernameAlreadyUsed = function (req, res) {
        if (req.query.username) {
            userService.getUserByUsername(req.query.username, function (err, user) {
                res.json({ username: req.query.username, isTaken: user != undefined })
            });
        }
        else res.send(400);
    }

    return {
        isUsernameAlreadyUsed: isUsernameAlreadyUsed
    }
}

module.exports = userController;