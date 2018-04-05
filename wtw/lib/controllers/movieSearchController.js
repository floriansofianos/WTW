var movieSearchController = function (movieDBService, movieQuestionnaireService, movieCacheService, userProfileService, movieRecommandationService, userService) {
    var search = function (req, res) {
        if (req.query.search && req.query.lang) {
            movieDBService.search(req.query.search, req.query.lang, function (err, result) {
                if (err) {
                    res.sendStatus(500);
                    throw new Error(err);
                }
                else res.json(result);
            });
        }
        else res.send(400);
    }

    var wtw = function (req, res) {
        if (req.user && req.query.lang) {
            movieDBService.wtw(req.user.id, req.user.country, req.query.lang, req.query.genreId, req.query.useWatchlist == "true", req.query.nowPlaying == "true", req.query.useRuntimeLimit == "true", req.query.runtimeLimit, req.query.minRelease, req.query.maxRelease, movieDBService.getRatingCertification(req.user.yearOfBirth), req.query.languageSelected, req.query.friendId, req.query.usePlex == "true", req.user.plexServerId, movieQuestionnaireService, movieCacheService, userProfileService, movieRecommandationService, movieDBService, function (err, result) {
                if (err) {
                    res.sendStatus(500);
                    throw new Error(err);
                }
                else res.json(result);
            });
        }
        else res.send(400);
    }

    return {
        search: search,
        wtw: wtw
    }
}

module.exports = movieSearchController;