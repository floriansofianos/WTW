var models = require('../models');
const Sequelize = require('../models').sequelize;

var friendshipService = function () {

    var followUser = function (currentUserId, userId, done) {
        if (currentUserId == userId) return done(null, false);
        models.Friendship.findOne({ where: { currentUserId: userId, friendUserId: userId } }).then(data => {
            if (data) {
                data.following = true;
                data.save().then(function (data, err) {
                    if (!err) done(null, true);
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
                    done(null, true);
                }).catch(function (err) {
                    done(err);
                });
            }
        }).catch(function (err) {
            done(err);
        });
    }

    var unfollowUser = function (currentUserId, userId, done) {
        models.Friendship.findOne({ where: { currentUserId: userId, friendUserId: userId } }).then(data => {
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

    var friendUser = function (currentUserId, currentUserEmail, userId, userEmail, done) {
        var Op = sequelize.Op;
        if (currentUserId == userId) return done(null, false);
        models.Friendship.findOne({ where: { currentUserId: userId, friendUserId: userId } }).then(data => {
            if (data) {
                return done(null, false);
            }
            else {
                models.PendingFriendship.find({ where: { [Op.or]: [{ fromUserId: currentUserId, toUserId: userId }, { fromUserId: userId, toUserId: currentUserId }] } }).then(data => {
                    if (data && data.length > 0) {
                        return done(null, false);
                    }
                    else {
                        //TODO Send email to notify userId
                        models.PendingFriendship.create({
                            fromUserId: currentUserId,
                            toUserId: userId
                        }).then(data => {
                            done(null, true);
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

    var acceptFriendRequest = function (currentUserId, userId, done) {
        if (currentUserId == userId) return done(null, false);
        models.PendingFriendship.findOne({ where: { fromUserId: userId, toUserId: currentUserId } }).then(pendingFriendship => {
            if (pendingFriendship) {
                //TODO Send email to notify userId
                //TODO delete pending friendship
                // Check if we have existing friendship first!!!
                models.Friendship.find({ where: { [Op.or]: [{ currentUserId: currentUserId, friendUserId: userId }, { currentUserId: userId, friendUserId: currentUserId }] } }).then(data => {
                    if (data && data.length > 0) {
                        data[0].isFriend = true;
                        data[0].save().then(function (res, err) {
                            if (!err) {
                                if (data.length > 1) {
                                    data[1].isFriend = true;
                                    data[1].save().then(function (data, err) {
                                        if (!err) done(null, true);
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
                                        done(null, true);
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
                                done(null, true);
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

    var unfriendUser = function (userId, movieDBId, done) {

    }

    return {
        followUser: followUser,
        unfollowUser: unfollowUser,
    }
}

module.exports = friendshipService;