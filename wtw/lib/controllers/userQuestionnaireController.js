var userQuestionnaireController = function (userQuestionnaireService, movieDBService, movieQuestionnaireService) {
    var get = function (req, res) {
        if (req.query.lang && req.user) {
            userQuestionnaireService.getRandom(req.user.id, function (err, result) {
                if (!err && result.movieDBId) {
                    // Check that we did not already answer this
                    movieQuestionnaireService.get(req.user.id, result.movieDBId, function (err, data) {
                        if (!err) {
                            if (data) {
                                // delete the entry in userQuestionnaireService
                                userQuestionnaireService.deleteQuestionnaire(req.user.id, result.movieDBId, function (err, data) {
                                    if (!err) res.json({ reload: true });
                                    else res.send(500);
                                });
                            }
                            else {
                                movieDBService.getMovieWithAdditionalInfo(result.movieDBId, req.query.lang, function (err, movie) {
                                    if (!err) res.json(movie);
                                    else res.send(500);
                                });
                            }
                        }
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