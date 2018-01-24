var movieController = function (movieDBService, movieCacheService, plexService) {
    var get = function (req, res) {
        if (req.query.lang && req.query.id && !req.query.movieIds) {
            movieDBService.getMovieWithAdditionalInfo(req.query.id, req.query.lang, function (err, movie) {
                if (!err) res.json(movie);
                else res.send(500);
            });
        }
        else if (req.query.lang && !req.query.id && req.query.movieIds) {
            movieDBService.getAllMovies(req.query.movieIds, req.query.lang, movieCacheService, function (err, movie) {
                if (!err) res.json(movie);
                else res.send(500);
            });
        }
        else res.send(400);
    }

    var checkPlex = function (req, res) {
        if (req.query.id) {
            if(!req.user.plexServerId) {
                res.send({ available: false });
            }
            plexService.isAvailableOnPlex(req.query.id, req.user.plexServerId, function(err, result) {
                res.send({ available: result });
            });
        }
        else res.send(400)
    }

    return {
        get: get,
        checkPlex: checkPlex
    }
}

module.exports = movieController;