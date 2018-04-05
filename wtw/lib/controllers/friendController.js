var friendController = function (friendshipService, userService, notificationService, timelineEventService) {
    var post = function (req, res) {
        if (req.params.id) {
            friendshipService.friendUser(req.user.id, +req.params.id, userService, notificationService, function (err, data) {
                if (err) {
                    res.sendStatus(500);
                    throw new Error(err);
                }
                else res.json(data);
            });
        }
        else res.send(400)
    };

    var acceptFriendRequest = function (req, res) {
        if (req.params.id) {
            var notificationId = req.body.notificationId;
            if (!notificationId) {
                notificationService.findFriendRequestNotification(req.user.id, +req.params.id, function (err, data) {
                    if (err) {
                        res.sendStatus(500);
                        throw new Error(err);
                    }
                    if (data) {
                        friendshipService.acceptFriendRequest(req.user.id, +req.params.id, data.id, req.user.username, userService, notificationService, timelineEventService, function (err, data) {
                            if (err) {
                                res.sendStatus(500);
                                throw new Error(err);
                            }
                            else res.json(data);
                        });
                    }
                    else res.send(500);
                });
            }
            else {
                friendshipService.acceptFriendRequest(req.user.id, +req.params.id, notificationId, req.user.username, userService, notificationService, timelineEventService, function (err, data) {
                    if (err) {
                        res.sendStatus(500);
                        throw new Error(err);
                    }
                    else res.json(data);
                });
            }
        }
        else res.send(400)
    }

    var refuseFriendRequest = function (req, res) {
        if (req.params.id) {
            var notificationId = req.body.notificationId;
            if (!notificationId) {
                notificationService.findFriendRequestNotification(req.user.id, +req.params.id, function (err, data) {
                    if (err) {
                        res.sendStatus(500);
                        throw new Error(err);
                    }
                    if (data) {
                        friendshipService.refuseFriendRequest(req.user.id, +req.params.id, data.id, userService, notificationService, function (err, data) {
                            if (err) {
                                res.sendStatus(500);
                                throw new Error(err);
                            }
                            else res.json(data);
                        });
                    }
                    else res.send(500);
                });
            }
            else {
                friendshipService.refuseFriendRequest(req.user.id, +req.params.id, notificationId, userService, notificationService, function (err, data) {
                    if (err) {
                        res.sendStatus(500);
                        throw new Error(err);
                    }
                    else res.json(data);
                });
            }
        }
        else res.send(400)
    }

    var get = function (req, res) {
        if (req.params.id) {
            friendshipService.getFriendship(req.user.id, +req.params.id, function (err, friendship) {
                if (err) {
                    res.sendStatus(500);
                    throw new Error(err);
                }
                else res.json(friendship);
            });
        }
        else res.send(400);
    }

    var getPending = function (req, res) {
        if (req.params.id) {
            friendshipService.getPendingFriendship(req.user.id, +req.params.id, function (err, pendingFriendship) {
                if (err) {
                    res.sendStatus(500);
                    throw new Error(err);
                }
                else res.json(pendingFriendship);
            });
        }
        else res.send(400);
    }

    var deleteFriend = function (req, res) {
        if (req.params.id) {
            friendshipService.unfriendUser(req.user.id, +req.params.id, function (err, data) {
                if (err) {
                    res.sendStatus(500);
                    throw new Error(err);
                }
                else res.json(data);
            });
        }
        else res.send(400);
    };

    var deletePendingFriend = function (req, res) {
        if (req.params.id) {
            friendshipService.deletePendingFriendship(req.user.id, +req.params.id, function (err, data) {
                if (err) {
                    res.sendStatus(500);
                    throw new Error(err);
                }
                else res.json(data);
            });
        }
        else res.send(400);
    }

    var getAll = function (req, res) {
        friendshipService.getAllFriendships(req.user.id, function (err, friendships) {
            if (err) {
                res.sendStatus(500);
                throw new Error(err);
            }
            else res.json(friendships);
        });
    }

    return {
        post: post,
        deleteFriend: deleteFriend,
        get: get,
        getPending: getPending,
        deletePendingFriend: deletePendingFriend,
        acceptFriendRequest: acceptFriendRequest,
        getAll: getAll,
        refuseFriendRequest: refuseFriendRequest
    }
}

module.exports = friendController;