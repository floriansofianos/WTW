var movieSearchController = function (movieDBService) {
    var search = function (req, res) {
        if (req.query.search) {
            movieDBService.search(req.query.search, function (err, result) {
                if (!err) res.json(result.results);
                else res.send(500);
            });
        }
        else res.send(400);
    }

    return {
        search: search
    }
}

module.exports = movieSearchController;