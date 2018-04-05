var followingController = function (friendshipService, userService, notificationService, timelineEventService) {
    var post = function (req, res) {
        if (req.params.id) {
            friendshipService.followUser(req.user.id, +req.params.id, userService, notificationService, timelineEventService, function (err, data) {
                if (err) {
                    res.sendStatus(500);
                    throw new Error(err);
                }
                else res.json(data);
            });
        }
        else res.send(400)
    };

    var deleteFollowing = function (req, res) {
        if (req.params.id) {
            friendshipService.unfollowUser(req.user.id, +req.params.id, function (err, data) {
                if (err) {
                    res.sendStatus(500);
                    throw new Error(err);
                }
                else res.json(data);
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