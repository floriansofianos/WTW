var models = require('../models');
const sequelize = require('sequelize');
var _ = require('underscore');

var friendshipService = function () {

    var followUser = function (currentUserId, userId, userService, notificationService, done) {
        if (currentUserId == userId) return done(null, false);
        models.Friendship.findOne({ where: { currentUserId: currentUserId, friendUserId: userId } }).then(data => {
            if (data) {
                data.following = true;
                data.save().then(function (data, err) {
                    if (!err) {
                        userService.getUserById(currentUserId, function (err, user) {
                            if (!err) {
                                notificationService.create(userId, 0, { username: user.username }, function (err, data) {
                                    if (!err) done(null, true);
                                    else done(err);
                                });
                            }
                            else done(err);
                        });
                    }
                    else done(err);
                })
                    .catch(function (err) {
                        done(err);
                    });
            }
            else {
                models.Friendship.create({
                    currentUserId: currentUserId,
                    friendUserId: userId,
                    following: true,
                    isFriend: false
                }).then(data => {
                    userService.getUserById(currentUserId, function (err, user) {
                        if (!err) {
                            notificationService.create(userId, 0, { username: user.username }, function (err, data) {
                                if (!err) done(null, true);
                                else done(err);
                            });
                        }
                        else done(err);
                    });
                }).catch(function (err) {
                    done(err);
                });
            }
        }).catch(function (err) {
            done(err);
        });
    }

    var unfollowUser = function (currentUserId, userId, done) {
        models.Friendship.findOne({ where: { currentUserId: currentUserId, friendUserId: userId } }).then(data => {
            if (data) {
                data.following = false;
                data.save().then(function (data, err) {
                    if (!err) done(null, true);
                    else done(err);
                })
                    .catch(function (err) {
                        done(err);
                    });
            }
            else {
                return done(null, false);
            }
        }).catch(function (err) {
            done(err);
        });
    }

    var friendUser = function (currentUserId, userId, userService, notificationService, done) {
        var Op = sequelize.Op;
        if (currentUserId == userId) return done(null, false);
        models.Friendship.findOne({ where: { currentUserId: currentUserId, friendUserId: userId, isFriend: true } }).then(data => {
            if (data) {
                return done(null, false);
            }
            else {
                models.PendingFriendship.findAll({ where: { [Op.or]: [{ fromUserId: currentUserId, toUserId: userId }, { fromUserId: userId, toUserId: currentUserId }] } }).then(data => {
                    if (data && data.length > 0) {
                        return done(null, false);
                    }
                    else {
                        models.PendingFriendship.create({
                            fromUserId: currentUserId,
                            toUserId: userId
                        }).then(data => {
                            userService.getUserById(currentUserId, function (err, user) {
                                if (!err) {
                                    notificationService.create(userId, 1, { username: user.username, userId: user.id }, function (err, data) {
                                        if (!err) done(null, true);
                                        else done(err);
                                    });
                                }
                                else done(err);
                            });
                        }).catch(function (err) {
                            done(err);
                        });
                    }
                }).catch(function (err) {
                    done(err);
                });
            }
        }).catch(function (err) {
            done(err);
        });
    }

    var deletePendingFriendship = function (currentUserId, userId, done) {
        var Op = sequelize.Op;
        models.PendingFriendship.destroy({ where: { [Op.or]: [{ fromUserId: userId, toUserId: currentUserId }, { fromUserId: currentUserId, toUserId: userId}] } }).then(result => {
            done(null, result);
        }).catch(function (err) {
            done(err);
        });
    }

    var acceptFriendRequest = function (currentUserId, userId, userService, notificationService, done) {
        var Op = sequelize.Op;
        if (currentUserId == userId) return done(null, false);
        models.PendingFriendship.findOne({ where: { fromUserId: userId, toUserId: currentUserId } }).then(pendingFriendship => {
            if (pendingFriendship) {
                //TODO Send email to notify userId
                // Check if we have existing friendship first!!!
                models.Friendship.findAll({ where: { [Op.or]: [{ currentUserId: currentUserId, friendUserId: userId }, { currentUserId: userId, friendUserId: currentUserId }] } }).then(data => {
                    if (data && data.length > 0) {
                        data[0].isFriend = true;
                        data[0].save().then(function (res, err) {
                            if (!err) {
                                if (data.length > 1) {
                                    data[1].isFriend = true;
                                    data[1].save().then(function (data, err) {
                                        if (!err) deletePendingFriendship(currentUserId, userId, function (err, result) {
                                            userService.getUserById(currentUserId, function (err, user) {
                                                if (!err) {
                                                    notificationService.create(userId, 2, { username: user.username }, function (err, data) {
                                                        if (!err) done(null, true);
                                                        else done(err);
                                                    });
                                                }
                                                else done(err);
                                            });
                                        });
                                        else done(err);
                                    })
                                        .catch(function (err) {
                                            done(err);
                                        });
                                }
                                else {
                                    var curUserId = data[0].currentUserId == currentUserId ? userId : currentUserId;
                                    var otherUserId = data[0].currentUserId == currentUserId ? currentUserId : userId;
                                    models.Friendship.create({
                                        currentUserId: currentUserId,
                                        friendUserId: userId,
                                        following: true,
                                        isFriend: true
                                    }).then(data => {
                                        deletePendingFriendship(currentUserId, userId, function (err, result) {
                                            userService.getUserById(currentUserId, function (err, user) {
                                                if (!err) {
                                                    notificationService.create(userId, 2, { username: user.username }, function (err, data) {
                                                        if (!err) done(null, true);
                                                        else done(err);
                                                    });
                                                }
                                                else done(err);
                                            });
                                        });
                                    }).catch(function (err) {
                                        done(err);
                                    });
                                }
                            }
                            else done(err);
                        }).catch(function (err) {
                            done(err);
                        });
                    }
                    else {
                        // Create two frindship entries
                        models.Friendship.create({
                            currentUserId: currentUserId,
                            friendUserId: userId,
                            following: true,
                            isFriend: true
                        }).then(data => {
                            models.Friendship.create({
                                currentUserId: userId,
                                friendUserId: currentUserId,
                                following: true,
                                isFriend: true
                            }).then(data => {
                                deletePendingFriendship(currentUserId, userId, function (err, result) {
                                    userService.getUserById(currentUserId, function (err, user) {
                                        if (!err) {
                                            notificationService.create(userId, 2, { username: user.username }, function (err, data) {
                                                if (!err) done(null, true);
                                                else done(err);
                                            });
                                        }
                                        else done(err);
                                    });
                                });
                            }).catch(function (err) {
                                done(err);
                            });
                        }).catch(function (err) {
                            done(err);
                        });
                    }
                }).catch(function (err) {
                    done(err);
                });
            }
            else {
                return done(null, false);
            }
        }).catch(function (err) {
            done(err);
        });
    }

    var refuseFriendRequest = function (currentUserId, userId, userService, notificationService, done) {
        var Op = sequelize.Op;
        if (currentUserId == userId) return done(null, false);
        deletePendingFriendship(currentUserId, userId, function (err, result) {
            userService.getUserById(currentUserId, function (err, user) {
                if (!err) {
                    notificationService.create(userId, 3, { username: user.username }, function (err, data) {
                        if (!err) done(null, true);
                        else done(err);
                    });
                }
                else done(err);
            });
        });
    }

    var unfriendUser = function (currentUserId, userId, done) {
        var Op = sequelize.Op;
        if (currentUserId == userId) return done(null, false);
        models.Friendship.findAll({ where: { [Op.or]: [{ currentUserId: currentUserId, friendUserId: userId }, { currentUserId: userId, friendUserId: currentUserId }] } }).then(data => {
            if (data && data.length > 0) {
                var friendshipToDelete = _.find(data, function (f) { return f.currentUserId == currentUserId });
                models.Friendship.destroy({ where: { id: friendshipToDelete.id } }).then(result => {
                    var friendshipToUpdate = _.find(data, function (f) { return f.currentUserId == userId });
                    friendshipToUpdate.isFriend = false;
                    friendshipToUpdate.save().then(function (data, err) {
                        if (!err) return done(null, true);
                        else done(err);
                    })
                        .catch(function (err) {
                            done(err);
                        });

                }).catch(function (err) {
                    done(err);
                });

            }
            else done(null, false);
        });
    }

    var getPendingFriendship = function (currentUserId, userId, done) {
        var Op = sequelize.Op;
        if (currentUserId == userId) return done(null, false);
        models.PendingFriendship.findAll({ where: { [Op.or]: [{ fromUserId: userId, toUserId: currentUserId }, { fromUserId: currentUserId, toUserId: userId }] } }).then(result => {
            done(null, result);
        }).catch(function (err) {
            done(err);
        });
    }

    var getFriendship = function (currentUserId, userId, done) {
        if (currentUserId == userId) return done(null, false);
        models.Friendship.findOne({ where: { currentUserId: currentUserId, friendUserId: userId } }).then(data => {
            done(null, data);
        }).catch(function (err) {
            done(err);
        });
    }

    var getAllFriendships = function (currentUserId, done) {
        models.Friendship.findAll({ where: { currentUserId: currentUserId, isFriend: true } }).then(data => {
            done(null, data);
        }).catch(function (err) {
            done(err);
        });
    }

    var getAllFollowings = function (currentUserId, done) {
        models.Friendship.findAll({ where: { currentUserId: currentUserId, following: true } }).then(data => {
            done(null, data);
        }).catch(function (err) {
            done(err);
        });
    }

    return {
        followUser: followUser,
        unfollowUser: unfollowUser,
        friendUser: friendUser,
        deletePendingFriendship: deletePendingFriendship,
        acceptFriendRequest: acceptFriendRequest,
        unfriendUser: unfriendUser,
        getPendingFriendship: getPendingFriendship,
        getFriendship: getFriendship,
        getAllFriendships: getAllFriendships,
        getAllFollowings: getAllFollowings,
        refuseFriendRequest: refuseFriendRequest
    }
}

module.exports = friendshipService;