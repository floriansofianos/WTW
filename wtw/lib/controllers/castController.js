﻿var castController = function (movieDBService) {
    var get = function (req, res) {
        if (req.query.directorId || req.query.writerId || req.query.actorId || req.query.creatorId) {
            movieDBService.getAlsoKnown(req.query.directorId, req.query.writerId, req.query.actorId, req.query.creatorId, req.query.lang, function (err, data) {
                if (err) {
                    res.sendStatus(500);
                    throw new Error(err);
                }
                else res.json(data);
            });
        }
        else res.send(400);
    };

    return {
        get: get
    }
}

module.exports = castController;