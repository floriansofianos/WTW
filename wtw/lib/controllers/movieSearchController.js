var movieSearchController = function (movieDBService, movieQuestionnaireService, movieCacheService, userProfileService, movieRecommandationService, userService) {
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
            movieDBService.wtw(req.user.id, req.user.country, req.query.lang, req.query.genreId, req.query.useWatchlist == "true", req.query.nowPlaying == "true", req.query.useRuntimeLimit == "true", req.query.runtimeLimit, req.query.minRelease, req.query.maxRelease, movieDBService.getRatingCertification(req.user.yearOfBirth), req.query.languageSelected, movieQuestionnaireService, movieCacheService, userProfileService, movieRecommandationService, movieDBService, function (err, result) {
                if (!err) res.json(result);
                else res.send(500);
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