var firstQuestionnaireController = function (movieDBService, movieQuestionnaireService) {
    var getMovie = function (req, res) {
        if (req.user) {
            movieQuestionnaireService.getAll(req.user.id, function (err, movieQuestionnaires) {
                if (!err) {
                    if (req.query.lang) {
                        movieDBService.getFirstTenMovies(req.query.lang, movieQuestionnaires, movieDBService.getRatingCertification(req.user.yearOfBirth), req.user.yearOfBirth, function (err, movie) {
                            if (!err) res.json(movie);
                            else res.send(500);
                        });
                    }
                    else res.send(400);
                }
                else res.send(500);
            });
        }
        else res.send(400);
        
    }

    return {
        getMovie: getMovie
    }
}

module.exports = firstQuestionnaireController;