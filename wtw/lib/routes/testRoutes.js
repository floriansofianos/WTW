var express = require('express');
var mdb = require('moviedb')('d03322a5a892ce280f22234584618e9e');

var testRoutes = function () {
    var testRouter = express.Router();

    testRouter.route('/')
        .get(function (req, res) {
            res.json({ test: 'Hello World From API' });
        });

    testRouter.route('/movieDB')
        .get(function (req, res) {
            mdb.searchMovie({ query: 'Alien' }, (err, data) => {
                res.json(data);
            });
        });

    return testRouter;
}

module.exports = testRoutes;