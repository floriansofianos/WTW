var movieRecommandationController = function (movieRecommandationService, movieDBService, userProfileService) {
    var getAll = function (req, res) {
        if (req.user) {
            movieRecommandationService.getAll(req.user.id, function (err, data) {
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
            movieRecommandationService.getScore(req.user.id, req.query.id, userProfileService, movieDBService, function (err, data) {
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

module.exports = movieRecommandationController;