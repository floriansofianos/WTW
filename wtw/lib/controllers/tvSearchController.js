var tvSearchController = function (movieDBService, tvQuestionnaireService, tvCacheService, userProfileService, tvRecommandationService, userService) {
    var search = function (req, res) {
        if (req.query.search && req.query.lang) {
            movieDBService.searchTV(req.query.search, req.query.lang, function (err, result) {
                if (!err) res.json(result.results);
                else res.send(500);
            });
        }
        else res.send(400);
    }

    var wtw = function (req, res) {
        if (req.user && req.query.lang) {
            movieDBService.wtwTV(req.user.id, req.user.country, req.query.lang, req.query.genreId, req.query.useWatchlist == "true", req.query.useRuntimeLimit == "true", req.query.runtimeLimit, req.query.minRelease, req.query.maxRelease, movieDBService.getRatingCertification(req.user.yearOfBirth), req.query.languageSelected, req.query.friendId, req.query.usePlex == "true", req.user.plexServerId, tvQuestionnaireService, tvCacheService, userProfileService, tvRecommandationService, movieDBService, function (err, result) {
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

module.exports = tvSearchController;