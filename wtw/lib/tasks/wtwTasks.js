var userService = require('../helpers/userService')();
var movieQuestionnaireService = require('../helpers/movieQuestionnaireService')();
var movieCacheService = require('../helpers/movieCacheService')();
var movieDBService = require('../helpers/movieDBService')();
var _ = require('underscore');

var wtwTasks = function (job, done) {
    console.log('Starting the WTW Tasks');
    console.log('Starting generating profiles...');

    // Retrieve all the users that need profile refresh
    userService.getUsersForPorfileRefresh(function (err, users) {
        _.each(users, function (u) {
            console.log('Starting generating profile of ' + u.username + '...');
            movieQuestionnaireService.getAll(u.id, function (err, questionnaires) {
                var movieIds = _.map(questionnaires, function (q) { return q.movieDBId; });
                // try to retrieve the movies from the cache
                movieCacheService.getAllInArray(movieIds, function (err, allMoviesCache) {
                    // Get all the informations we need for our questionnaires
                    processMovieQuestionnaires(questionnaires, allMoviesCache, function (err, questionnaires) {
                        // Deal with genres
                        console.log('Dealing with genres!');

                        // Deal with directors

                        // Deal with actors

                        // TODO Deal with custom tags
                    });
                });
            })
        });
    });
    // call done when finished
    done();
}

var processMovieQuestionnaires = function (questionnaires, allMoviesCache, done) {
    processQuestionnaire(questionnaires, allMoviesCache, 0, done);
}

var processQuestionnaire = function (questionnaires, allMoviesCache, i, done) {
    if (i < questionnaires.length) {
        var q = questionnaires[i];
        getMovieInfo(q.movieDBId, allMoviesCache.movieInfos, function (err, movieInfo) {
            q.movieInfo = movieInfo;
            getMovieCredits(q.movieDBId, allMoviesCache.movieCredits, function (err, movieCredits) {
                q.movieCredits = movieCredits;
                processQuestionnaire(questionnaires, allMoviesCache, i + 1, done);
            });
        });
    }
    else done(null, questionnaires);
}

var getMovieInfo = function (id, movieInfos, done) {
    var result = _.find(movieInfos, function (m) { return m.movieDBId === id });
    if (!result) {
        movieDBService.getMovie(id, 'en', done);
    }
    else done(null, result);
}

var getMovieCredits = function (id, movieCredits, done) {
    var result = _.find(movieCredits, function (m) { return m.movieDBId === id });
    if (!result) {
        movieDBService.getMovieCredits(id, done);
    }
    else done(null, result);
}

module.exports = wtwTasks;