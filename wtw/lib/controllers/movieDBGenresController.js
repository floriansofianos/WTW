var movieDBGenresController = function(movieDBService) {
    var getAll = function(req, res) {
        movieDBService.getGenres(function(err, result) {
            if (!err) res.json(result.results);
            else res.send(500);
        });
    }

    return {
        getAll: getAll
    }
}

module.exports = movieDBGenresController;