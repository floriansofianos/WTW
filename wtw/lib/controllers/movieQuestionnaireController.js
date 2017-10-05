var movieQuestionnaireController = function (movieQuestionnaireService) {
    var getAll = function (req, res) {
        if (req.user) {
            movieQuestionnaireService.getAll(req.user.id, function (err, data) {
                if (!err) res.json(data);
                else res.send(500);
            });
        }
        else res.send(400);
    };

    var get = function (req, res) {
        if (req.user && req.params.id) {
            if (req.params.id == 'watchlist') {
                movieQuestionnaireService.getWatchlist(req.user.id, function (err, data) {
                    if (!err) res.json(data);
                    else res.send(500);
                });
            }
            else {
                movieQuestionnaireService.get(req.user.id, req.params.id, function (err, data) {
                    if (!err) res.json(data);
                    else res.send(500);
                });
            }
        }
        else res.send(400);
    };

    var createOrUpdate = function (req, res) {
        if (req.user) {
            movieQuestionnaireService.createOrUpdate(req.body, req.user.id, function (err, data) {
                if (!err) res.json(data);
                else res.send(500);
            });
        }
        else res.send(400);
    };

    return {
        getAll: getAll,
        createOrUpdate: createOrUpdate,
        get: get
    }
}

module.exports = movieQuestionnaireController;