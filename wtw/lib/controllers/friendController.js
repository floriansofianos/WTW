var friendController = function (friendshipService) {
    var post = function (req, res) {
        if (req.params.id) {
            friendshipService.friendUser(req.user.id, req.params.id, function (err, data) {
                if (!err) res.json(data);
                else res.send(500);
            });
        }
        else res.send(400)
    };

    var acceptFriendRequest = function (req, res) {
        if (req.params.id) {
            friendshipService.acceptFriendRequest(req.user.id, req.params.id, function (err, data) {
                if (!err) res.json(data);
                else res.send(500);
            });
        }
        else res.send(400)
    }

    var get = function (req, res) {
        if (req.params.id) {
            friendshipService.getFriendship(req.user.id, req.params.id, function (err, friendship) {
                if (!err) res.json(friendship);
                else res.send(500);
            });
        }
        else res.send(400);
    }

    var getPending = function (req, res) {
        if (req.params.id) {
            friendshipService.getPendingFriendship(req.user.id, req.params.id, function (err, pendingFriendship) {
                if (!err) res.json(pendingFriendship);
                else res.send(500);
            });
        }
        else res.send(400);
    }

    var deleteFriend = function (req, res) {
        if (req.params.id) {
            friendshipService.unfriendUser(req.user.id, req.params.id, function (err, data) {
                if (!err) res.json(data);
                else res.send(500);
            });
        }
        else res.send(400);
    };

    var deletePendingFriend = function (req, res) {
        if (req.params.id) {
            friendshipService.deletePendingFriendship(req.user.id, req.params.id, function (err, data) {
                if (!err) res.json(data);
                else res.send(500);
            });
        }
        else res.send(400);
    }

    return {
        post: post,
        delete: deleteFriend,
        get: get,
        getPending: getPending,
        deletePendingFriend: deletePendingFriend,
        acceptFriendRequest: acceptFriendRequest
    }
}

module.exports = friendController;