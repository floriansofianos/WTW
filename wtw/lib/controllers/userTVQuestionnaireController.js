var userTVQuestionnaireController = function (userTVQuestionnaireService, tvCacheService, tvQuestionnaireService) {
    var get = function (req, res) {
        if (req.query.lang && req.user) {
            userTVQuestionnaireService.getRandom(req.user.id, function (err, result) {
                if (err) {
                    res.sendStatus(500);
                    throw new Error(err);
                }
                if (!err && result && result.movieDBId) {
                    // Check that we did not already answer this
                    tvQuestionnaireService.get(req.user.id, result.movieDBId, function (err, data) {
                        if (err) {
                            res.sendStatus(500);
                            throw new Error(err);
                        }
                        else {
                            if (data) {
                                // delete the entry in userTVQuestionnaireService
                                userTVQuestionnaireService.deleteQuestionnaire(req.user.id, result.movieDBId, function (err, data) {
                                    if (err) {
                                        res.sendStatus(500);
                                        throw new Error(err);
                                    }
                                    else res.json({ reload: true });
                                });
                            }
                            else {
                                tvCacheService.getWithTrailer(result.movieDBId, req.query.lang, function (err, movie) {
                                    if (err) {
                                        res.sendStatus(500);
                                        throw new Error(err);
                                    }
                                    else res.json(movie);
                                });
                            }
                        }
                    });
                }
                else if (!err && !result) {
                    // We do not have any questionnaires for that user. Just get a popular TV show.
                    tvCacheService.getRandom(req.query.lang, function (err, result) {
                        if (err) {
                            res.sendStatus(500);
                            throw new Error(err);
                        }
                        if (!err && result && result.movieDBId) {
                            // Check that we did not already answer this
                            tvQuestionnaireService.get(req.user.id, result.movieDBId, function (err, data) {
                                if (err) {
                                    res.sendStatus(500);
                                    throw new Error(err);
                                }
                                else {
                                    if (data) {
                                        // delete the entry in userTVQuestionnaireService
                                        userTVQuestionnaireService.deleteQuestionnaire(req.user.id, result.movieDBId, function (err, data) {
                                            if (err) {
                                                res.sendStatus(500);
                                                throw new Error(err);
                                            }
                                            else res.json({ reload: true });
                                        });
                                    }
                                    else {
                                        tvCacheService.getWithTrailer(result.movieDBId, req.query.lang, function (err, movie) {
                                            if (err) {
                                                res.sendStatus(500);
                                                throw new Error(err);
                                            }
                                            else res.json(movie);
                                        });
                                    }
                                }
                            });
                        }
                        else res.send(500);
                    });

                }
                else res.send(500);
            });
        }
        else res.send(400);
    }

    return {
        get: get
    }
}

module.exports = userTVQuestionnaireController;