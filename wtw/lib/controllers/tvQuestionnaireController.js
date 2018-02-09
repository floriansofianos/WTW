var tvQuestionnaireController = function (tvQuestionnaireService, timelineEventService) {
    var getAll = function (req, res) {
        if (req.user) {
            tvQuestionnaireService.getAll(req.user.id, function (err, data) {
                if (!err) res.json(data);
                else res.send(500);
            });
        }
        else res.send(400);
    };

    var get = function (req, res) {
        if (req.user && req.params.id) {
            if (req.params.id == 'watchlist') {
                tvQuestionnaireService.getWatchlist(req.user.id, function (err, data) {
                    if (!err) res.json(data);
                    else res.send(500);
                });
            }
            else {
                tvQuestionnaireService.get(req.user.id, req.params.id, function (err, data) {
                    if (!err) res.json(data);
                    else res.send(500);
                });
            }
        }
        else res.send(400);
    };

    var getUsersThatAlsoLiked = function (req, res) {
        tvQuestionnaireService.getUsersThatAlsoLiked(req.user.id, function (err, data) {
            if (!err) res.json(data);
            else res.send(500);
        });
    }

    var createOrUpdate = function (req, res) {
        if (req.user) {
            tvQuestionnaireService.createOrUpdate(req.body, req.user.id, timelineEventService, function (err, data) {
                if (!err) res.json(data);
                else res.send(500);
            });
        }
        else res.send(400);
    };

    return {
        getAll: getAll,
        createOrUpdate: createOrUpdate,
        get: get,
        getUsersThatAlsoLiked: getUsersThatAlsoLiked
    }
}

module.exports = tvQuestionnaireController;