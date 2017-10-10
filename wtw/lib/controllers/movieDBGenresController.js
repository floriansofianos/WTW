var movieDBGenresController = function(movieDBService) {
    var getAll = function(req, res) {
        res.json(movieDBService.getGenres());
    }

    return {
        getAll: getAll
    }
}

module.exports = movieDBGenresController;