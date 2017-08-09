var firstQuestionnaireController = function (movieDBService) {
    var getMovie = function (req, res) {
        if (req.query.lang) {
            movieDBService.getFirstTenMovies(req.query.lang, function (err, movie) {
                if (!err) res.json(movie);
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