var movieQuestionnaireController = function (movieQuestionnaireService, timelineEventService) {
    var getAll = function (req, res) {
        if (req.user) {
            movieQuestionnaireService.getAll(req.user.id, function (err, data) {
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
        if (req.user && req.params.id) {
            if (req.params.id == 'watchlist') {
                movieQuestionnaireService.getWatchlist(req.user.id, function (err, data) {
                    if (err) {
                        res.sendStatus(500);
                        throw new Error(err);
                    }
                    else res.json(data);
                });
            }
            else {
                movieQuestionnaireService.get(req.user.id, req.params.id, function (err, data) {
                    if (err) {
                        res.sendStatus(500);
                        throw new Error(err);
                    }
                    else res.json(data);
                });
            }
        }
        else res.send(400);
    };

    var getUsersThatAlsoLiked = function (req, res) {
        movieQuestionnaireService.getUsersThatAlsoLiked(req.user.id, function (err, data) {
            if (err) {
                res.sendStatus(500);
                throw new Error(err);
            }
            else res.json(data);
        });
    }

    var createOrUpdate = function (req, res) {
        if (req.user) {
            movieQuestionnaireService.createOrUpdate(req.body, req.user.id, timelineEventService, function (err, data) {
                if (err) {
                    res.sendStatus(500);
                    throw new Error(err);
                }
                else res.json(data);
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

module.exports = movieQuestionnaireController;