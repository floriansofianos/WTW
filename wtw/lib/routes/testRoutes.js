var express = require('express');

var testRoutes = function () {
    var testRouter = express.Router();

    testRouter.route('/')
        .get(function (req, res) {
            res.json({ test: 'Hello World From API' });
        });

    return testRouter;
}

module.exports = testRoutes;