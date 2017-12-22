var models = require('../models');

module.exports = function () {
    var getPage = function (userId, followerIds, page, done) {
        var resultPerPage = 20;
        models.TimelineEvent.findAll({ where: { [Op.or]: [{ userId: userId, type: 0 }, { userId: { $in: followerIds } }] }, offset: resultPerPage * page, limit: resultPerPage }).then(events => {
            done(null, events);
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