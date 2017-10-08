var movieRecommandationController = function (movieRecommandationService) {
    var getAll = function (req, res) {
        if (req.user) {
            movieRecommandationService.getAll(req.user.id, function (err, data) {
                if (!err) res.json(data);
                else res.send(500);
            });
        }
        else res.send(400);
    };

    return {
        getAll: getAll
    }
}

module.exports = movieRecommandationController;