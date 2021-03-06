﻿var userQuestionnaireController = function (userQuestionnaireService, movieDBService, movieQuestionnaireService) {
    var get = function (req, res) {
        if (req.query.lang && req.user) {
            userQuestionnaireService.getRandom(req.user.id, function (err, result) {
                if (err) {
                    res.sendStatus(500);
                    throw new Error(err);
                }
                if (!err && result && result.movieDBId) {
                    // Check that we did not already answer this
                    movieQuestionnaireService.get(req.user.id, result.movieDBId, function (err, data) {
                        if (err) {
                            res.sendStatus(500);
                            throw new Error(err);
                        }
                        else {
                            if (data) {
                                // delete the entry in userQuestionnaireService
                                userQuestionnaireService.deleteQuestionnaire(req.user.id, result.movieDBId, function (err, data) {
                                    if (err) {
                                        res.sendStatus(500);
                                        throw new Error(err);
                                    }
                                    else res.json({ reload: true });
                                });
                            }
                            else {
                                movieDBService.getMovieWithAdditionalInfo(result.movieDBId, req.query.lang, function (err, movie) {
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
                else if (!result && !err) {
                    res.json({ noResult: true });
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

module.exports = userQuestionnaireController;