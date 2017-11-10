var express = require('express');
var languages = require('../static/supported-languages.json');

var languagesRoutes = function () {
    var languagesRouter = express.Router();

    languagesRouter.route('/')
        .get(function (req, res) {
            res.json({ languages: languages });
        });

    return languagesRouter;
}

module.exports = languagesRoutes;