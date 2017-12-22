var timelineEventController = function (timelineEventService) {
    var getPage = function (req, res) {
        if (req.user.id && req.query.page) {
            timelineEventService.getPage(req.user.id, /* missing followers ids */req.query.page, function (err, data) {
                if (!err) res.json(data);
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