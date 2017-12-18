﻿var models = require('../models');

module.exports = function () {
    var getAll = function (userId, done) {
        models.Notification.findAll({ where: { userId: userId, read: false } }).then(notifications => {
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
    // 0: Someone following you
    // 1:  
    var create = function (userId, type, variables, done) {
        models.Notification.create({
            userId: userId,
            type: type,
            variables: variables,
            read: false
        }).then(notification => {
            done(null, notification);
        }).catch(function (err) {
            done(err);
        });
    }

    
    return {
        getAll: getAll,
        create: create
    }
}