var castController = function (movieDBService) {
    var get = function (req, res) {
        if (req.query.id) {
            movieDBService.getCast(req.query.id, function (err, data) {
                if (!err) res.json(data);
                else res.send(500);
            });
        }
        else res.send(400);
    };

    return {
        get: get
    }
}

module.exports = castController;