var notificationController = function (notificationService) {
    var getAll = function (req, res) {
        if (req.user.id) {
            notificationService.getAll(req.user.id, function (err, data) {
                if (err) {
                    res.sendStatus(500);
                    throw new Error(err);
                }
                else res.json(data);
            });
        }
        else res.send(400);
    };

    var readAllReadOnly = function (req, res) {
        if (req.user.id) {
            notificationService.readAllReadOnly(req.user.id, function (err, data) {
                if (err) {
                    res.sendStatus(500);
                    throw new Error(err);
                }
                else res.json(data);
            });
        }
        else res.send(400);
    }

    return {
        getAll: getAll,
        readAllReadOnly: readAllReadOnly
    }
}

module.exports = notificationController;