var userService = require('../helpers/userService')();
var movieQuestionnaireService = require('../helpers/movieQuestionnaireService')();
var movieCacheService = require('../helpers/movieCacheService')();
var movieDBService = require('../helpers/movieDBService')();
var userProfileService = require('../helpers/userProfileService')();
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
                        console.log('Starting generating genres profile...');
                        var moviesGenres = [];
                        _.each(_.filter(questionnaires, function (q) { return !q.isSkipped }), function (q) {
                            _.each(q.movieInfo.genres, function (g) {
                                moviesGenres.push({ movieDBId: q.movieDBId, genreId: g.id, name: g.name, score: getQuestionnaireScore(q) });
                            });
                        });
                        var moviesGrouped = _.groupBy(moviesGenres, 'genreId');
                        _.each(moviesGrouped, function (g) {
                            var userProfile = {
                                userId: u.id,
                                name: g[0].name,
                                genreId: g[0].genreId,
                                score: (_.reduce(g, function (memo, m) { return memo + m.score; }, 0)) / (_.size(g))
                            }
                            userProfileService.createOrUpdate(userProfile, function (err, res) { });
                        });

                        // Deal with directors

                        // Deal with writers

                        // Deal with actors

                        // TODO Deal with custom tags => probably put them in genres
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
            q.movieInfo = movieInfo.data;
            getMovieCredits(q.movieDBId, allMoviesCache.movieCredits, function (err, movieCredits) {
                q.movieCredits = movieCredits.data;
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

var getQuestionnaireScore = function (questionnaire) {
    if (questionnaire.isSeen) {
        return (questionnaire.rating - 1) * 25;
    }
    else {
        return questionnaire.wantToSee ? 75 : 0;
    }
}

module.exports = wtwTasks;