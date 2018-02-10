var tvshowController = function (movieDBService, tvCacheService, plexService) {
    var get = function (req, res) {
        if (req.query.lang && req.query.id && !req.query.movieIds) {
            tvCacheService.getWithTrailer(req.query.id, req.query.lang, function (err, movie) {
                if (!err) res.json(movie);
                else res.send(500);
            });
        }
        else if (req.query.lang && !req.query.id && req.query.movieIds) {
            movieDBService.getAllTVShows(req.query.movieIds, req.query.lang, tvCacheService, function (err, movie) {
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
            plexService.isTVAvailableOnPlex(req.query.id, req.user.plexServerId, function(err, result) {
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

module.exports = tvshowController;