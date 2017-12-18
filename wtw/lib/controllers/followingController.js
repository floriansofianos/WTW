var followingController = function (friendshipService, userService, notificationService) {
    var post = function (req, res) {
        if (req.params.id) {
            friendshipService.followUser(req.user.id, +req.params.id, userService, notificationService, function (err, data) {
                if (!err) res.json(data);
                else res.send(500);
            });
        }
        else res.send(400)
    };

    var deleteFollowing = function (req, res) {
        if (req.params.id) {
            friendshipService.unfollowUser(req.user.id, +req.params.id, function (err, data) {
                if (!err) res.json(data);
                else res.send(500);
            });
        }
        else res.send(400)
    };

    return {
        post: post,
        deleteFollowing: deleteFollowing
    }
}

module.exports = followingController;