var express = require('express');
var countries = require('../static/countries.json');

var countriesRoutes = function () {
    var countriesRouter = express.Router();

    countriesRouter.route('/')
        .get(function (req, res) {
            res.json({ countries: countries });
        });

    return countriesRouter;
}

module.exports = countriesRoutes;