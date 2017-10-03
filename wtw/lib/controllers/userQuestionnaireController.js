var userQuestionnaireController = function (userQuestionnaireService, movieDBService) {
    var get = function (req, res) {
        if (req.query.lang && req.user) {
            userQuestionnaireService.getRandom(req.user.id, function (err, result) {
                if (!err && result.movieDBId) {
                    movieDBService.getMovieWithAdditionalInfo(result.movieDBId, req.query.lang, function (err, movie) {
                        if (!err) res.json(movie);
                        else res.send(500);
                    });
                }
                else res.send(500);
            });
        }
        else res.send(400);
    }

    return {
        get: get
    }
}

module.exports = userQuestionnaireController;