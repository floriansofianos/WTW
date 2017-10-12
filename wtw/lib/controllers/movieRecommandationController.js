var movieRecommandationController = function (movieRecommandationService, movieDBService, userProfileService) {
    var getAll = function (req, res) {
        if (req.user) {
            movieRecommandationService.getAll(req.user.id, function (err, data) {
                if (!err) res.json(data);
                else res.send(500);
            });
        }
        else res.send(400);
    };

    var get = function (req, res) {
        if (req.user && req.query.id) {
            movieRecommandationService.getScore(req.user.id, req.query.id, userProfileService, movieDBService, function (err, data) {
                if (!err) res.json(data);
                else res.send(500);
            });
        }
    }

    return {
        getAll: getAll,
        get: get
    }
}

module.exports = movieRecommandationController;