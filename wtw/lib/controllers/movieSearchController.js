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

    var wtw = function (req, res) {
        if (req.user && req.query.lang) {
            movieDBService.wtw(req.user.id, req.query.lang, req.query.genreId, req.query.useWishlist, req.query.useRuntimeLimit, req.query.runtimeLimit, function (err, result) {
                if (!err) res.json(result);
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