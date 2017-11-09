var supportedLanguages = require('../static/supported-languages.json');
var CountryLanguage = require('country-language');
var _ = require('underscore');

var movieLanguageService = function () {

    var getSupportedLanguages = function (country, done) {
        CountryLanguage.getCountryLanguages(country, function (err, languages) {
            if (err) {
                return done(err);
            } else {
                return done(null, _.filter(languages, function (l) { return _.find(supportedLanguages, function (s) { return s.code == l.iso639_1; }) != undefined; }));
            }
        });
    }

    return {
        getSupportedLanguages: getSupportedLanguages
    }
}

module.exports = movieLanguageService;