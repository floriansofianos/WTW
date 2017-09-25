var movieController = function (movieDBService) {
    var get = function (req, res) {
        if (req.query.lang && req.query.id) {
            movieDBService.getMovieWithAdditionalInfo(req.query.id, req.query.lang, function (err, movie) {
                if (!err) res.json(movie);
                else res.send(500);
            });
        }
        else res.send(400);
    }

    return {
        get: get
    }
}

module.exports = movieController;