var _ = require('underscore');

var timelineEventController = function (timelineEventService, friendshipService) {
    var getPage = function (req, res) {
        if (req.user.id && req.query.page) {
            friendshipService.getAllFollowings(req.user.id, function (err, data) {
                var followingIds = _.map(data, 'friendUserId');
                if (!err) {
                    timelineEventService.getPage(req.user.id, followingIds, req.query.page, function (err, data) {
                        if (!err) res.json(data);
                        else res.send(500);
                    });
                }
                else res.send(500);
            });
        }
        else res.send(400);
    };

    return {
        getPage: getPage
    }
}

module.exports = timelineEventController;