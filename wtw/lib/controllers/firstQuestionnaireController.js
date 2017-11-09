var _ = require('underscore');

var firstQuestionnaireController = function (movieDBService, movieQuestionnaireService, movieLanguageService) {
    var getMovie = function (req, res) {
        if (req.user) {
            movieQuestionnaireService.getAll(req.user.id, function (err, movieQuestionnaires) {
                if (!err) {
                    if (req.query.lang) {
                        if (req.user.country) {
                            movieLanguageService.getSupportedLanguages(req.user.country, function (err, languages) {
                                if (err) return res.send(500);
                                else {
                                    var language = Math.random() > 0.4 ? null : _.sample(languages);
                                    movieDBService.getFirstTenMovies(req.query.lang, movieQuestionnaires, movieDBService.getRatingCertification(req.user.yearOfBirth), req.user.yearOfBirth, language == null ? null : language.iso639_1, function (err, movie) {
                                        if (!err) res.json(movie);
                                        else res.send(500);
                                    });
                                }
                            });
                        }
                        else {
                            movieDBService.getFirstTenMovies(req.query.lang, movieQuestionnaires, movieDBService.getRatingCertification(req.user.yearOfBirth), req.user.yearOfBirth, null, function (err, movie) {
                                if (!err) res.json(movie);
                                else res.send(500);
                            });
                        }
                    }
                    else res.send(400);
                }
                else res.send(500);
            });
        }
        else res.send(400);
        
    }

    return {
        getMovie: getMovie
    }
}

module.exports = firstQuestionnaireController;