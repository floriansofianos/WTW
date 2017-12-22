var models = require('../models');

module.exports = function () {
    var getPage = function (userId, followerIds, page, done) {
        var resultPerPage = 20;
        models.TimelineEvent.findAll({ where: { userId: userId, read: false } }).then(notifications => {
            var unreadNotifications = notifications;
            models.Notification.findAll({ where: { userId: userId, read: true }, order: [['id', 'DESC']], limit: 3 }).then(notifications => {
                var allNotifications = notifications.concat(unreadNotifications);
                done(null, allNotifications);
            }).catch(function (err) {
                done(err);
            });
        })
            .catch(function (err) {
                done(err);
            });
    }

    // Types
    // 0: Rate movie
    // 1: Follow
    // 2: Friend
    var create = function (userId, type, variables, done) {
        models.TimelineEvent.create({
            userId: userId,
            type: type,
            variables: variables,
            isShared: true
        }).then(event => {
            done(null, event);
        }).catch(function (err) {
            done(err);
        });
    }

    return {
        getPage: getPage,
        create: create
    }
}