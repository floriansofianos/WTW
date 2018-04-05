var tvRecommandationController = function (tvRecommandationService, tvCacheService, userProfileService) {
    var getAll = function (req, res) {
        if (req.user) {
            tvRecommandationService.getAll(req.user.id, function (err, data) {
                if (err) {
                    res.sendStatus(500);
                    throw new Error(err);
                }
                else res.json(data);
            });
        }
        else res.send(400);
    };

    var get = function (req, res) {
        if (req.user && req.query.id) {
            tvRecommandationService.getScore(req.user.id, req.query.id, userProfileService, tvCacheService, function (err, data) {
                if (err) {
                    res.sendStatus(500);
                    throw new Error(err);
                }
                else res.json(data);
            });
        }
    }

    return {
        getAll: getAll,
        get: get
    }
}

module.exports = tvRecommandationController;