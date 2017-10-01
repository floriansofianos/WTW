var userService = require('../helpers/userService')();
var movieQuestionnaireService = require('../helpers/movieQuestionnaireService')();
var movieCacheService = require('../helpers/movieCacheService')();
var movieDBService = require('../helpers/movieDBService')();
var userProfileService = require('../helpers/userProfileService')();
var _ = require('underscore');

var wtwTasks = function (job, done) {
    console.log('Starting the WTW Tasks');
    console.log('Starting generating profiles...');
    generateUsersProfile(function (err, res) {
        console.log('Starting generating questionnaires...');
        generateUsersQuestionnaires(function (err, res) {
            console.log('ALL DONE !!!!!!');
        });
        
    });
    // call done when finished
    done();
}

var generateUsersQuestionnaires = function (done) {
    // Retrieve all the users that need more questionnaires
    userService.getUsersForQuestionnaireRefresh(function (err, users) {
        generateQuestionnaires(users, 0, done);
    });
}

var generateQuestionnaires = function (users, i, done) {
    if (i < users.length) {
        var u = users[i];
        console.log('Starting generating questionnaires for ' + u.username + '...');
        // Get all existing questionnaires and profiles
        movieQuestionnaireService.getAll(u.id, function (err, questionnaires) {
            userProfileService.getAll(u.id, function (err, profiles) {
                userQuestionnaireService.getAll(u.id, function (err, userQuestionnaires) {
                    // Deal with genres
                    var filteredGenreProfiles = _.filter(profiles, function (p) { return p.scoreRelevance < 50 && p.genreId != null; });
                    generateGenreQuestionnaire(_.map(filteredGenreProfiles, 'genreId'), questionnaires, userQuestionnaires, 0, function (err, res) {
                        // Deal with directors
                    });
                });
            });
        });
    }
    else done(null, true);
}

var generateGenreQuestionnaire = function (genreIds, questionnaires, userQuestionnaires, i, done) {
    if (i < genreIds.length) {
        var genreId = genreIds[i];
        // get movieDB movies
        console.log(genreId);
    }
    else done(null, true);
}



var generateUsersProfile = function (done) {
    // Retrieve all the users that need profile refresh
    userService.getUsersForPorfileRefresh(function (err, users) {
        generateUserProfile(users, 0, done);
    });
}

var generateUserProfile = function (users, i, done) {
    if (i < users.length) {
        var u = users[i];
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
                    processMovieGenreGroups(moviesGrouped, function (err, res) {

                        // Deal with directors
                        console.log('Starting generating directors profile...');
                        var moviesDirectors = [];
                        _.each(_.filter(questionnaires, function (q) { return !q.isSkipped }), function (q) {
                            var directors = movieDBService.getDirectors(q.movieCredits);
                            _.each(directors, function (d) {
                                moviesDirectors.push({ movieDBId: q.movieDBId, directorId: d.id, name: d.name, score: getQuestionnaireScore(q) });
                            });
                        });
                        var moviesGrouped = _.groupBy(moviesDirectors, 'directorId');
                        processMovieDirectorGroups(moviesGrouped, function (err, res) {

                            // Deal with writers
                            console.log('Starting generating writers profile...');
                            var moviesWriters = [];
                            _.each(_.filter(questionnaires, function (q) { return !q.isSkipped }), function (q) {
                                var writers = movieDBService.getWriters(q.movieCredits);
                                _.each(writers, function (w) {
                                    moviesWriters.push({ movieDBId: q.movieDBId, writerId: w.id, name: w.name, score: getQuestionnaireScore(q) });
                                });
                            });
                            var moviesGrouped = _.groupBy(moviesWriters, 'writerId');
                            processMovieWriterGroups(moviesGrouped, function (err, res) {

                                // Deal with actors
                                console.log('Starting generating actors profile...');
                                var moviesActors = [];
                                _.each(_.filter(questionnaires, function (q) { return !q.isSkipped }), function (q) {
                                    var actors = movieDBService.getActors(q.movieCredits);
                                    _.each(actors, function (a) {
                                        moviesActors.push({ movieDBId: q.movieDBId, castId: a.id, name: a.name, score: getQuestionnaireScore(q) });
                                    });
                                });
                                var moviesGrouped = _.groupBy(moviesActors, 'castId');
                                processMovieActorGroups(moviesGrouped, function (err, res) {
                                    console.log('User profile created!');
                                    userService.setUserProfileRefresh(u.id, false, function (err, user) {
                                        generateUserProfile(users, i + 1, done)
                                    });
                                });
                            });
                        });
                    });
                });
            });
        })
    }
    else done(null, users);
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


var processMovieGenreGroups = function (moviesGrouped, done) {
    processGenreGroup(moviesGrouped, 0, done);
}

var processGenreGroup = function (moviesGrouped, i, done) {
    if (i < moviesGrouped.length) {
        var g = moviesGrouped[i];
        var userProfile = {
            userId: u.id,
            name: g[0].name,
            genreId: g[0].genreId,
            score: (_.reduce(g, function (memo, m) { return memo + m.score; }, 0)) / (_.size(g)),
            scoreRelevance: getGenreScoreRelevance(_.size(g))
        }
        userProfileService.createOrUpdate(userProfile, function (err, res) {
            processGenreGroup(moviesGrouped, i + 1, done);
        });
    }
    else done(null, true);
}

var processMovieDirectorGroups = function (moviesGrouped, done) {
    processDirectorGroup(moviesGrouped, 0, done);
}

var processDirectorGroup = function (moviesGrouped, i, done) {
    if (i < moviesGrouped.length) {
        var g = moviesGrouped[i];
        var userProfile = {
            userId: u.id,
            name: g[0].name,
            directorId: g[0].directorId,
            score: (_.reduce(g, function (memo, m) { return memo + m.score; }, 0)) / (_.size(g)),
            scoreRelevance: getDirectorScoreRelevance(_.size(g))
        }
        userProfileService.createOrUpdate(userProfile, function (err, res) {
            processDirectorGroup(moviesGrouped, i + 1, done);
        });
    }
    else done(null, true);
}

var processMovieWriterGroups = function (moviesGrouped, done) {
    processWriterGroup(moviesGrouped, 0, done);
}

var processWriterGroup = function (moviesGrouped, i, done) {
    if (i < moviesGrouped.length) {
        var g = moviesGrouped[i];
        var userProfile = {
            userId: u.id,
            name: g[0].name,
            writerId: g[0].writerId,
            score: (_.reduce(g, function (memo, m) { return memo + m.score; }, 0)) / (_.size(g)),
            scoreRelevance: getDirectorScoreRelevance(_.size(g))
        }
        userProfileService.createOrUpdate(userProfile, function (err, res) {
            processWriterGroup(moviesGrouped, i + 1, done);
        });
    }
    else done(null, true);
}

var processMovieActorGroups = function (moviesGrouped, done) {
    processActorGroup(moviesGrouped, 0, done);
}

var processActorGroup = function (moviesGrouped, i, done) {
    if (i < moviesGrouped.length) {
        var g = moviesGrouped[i];
        var userProfile = {
            userId: u.id,
            name: g[0].name,
            castId: g[0].castId,
            score: (_.reduce(g, function (memo, m) { return memo + m.score; }, 0)) / (_.size(g)),
            scoreRelevance: getGenreScoreRelevance(_.size(g))
        }
        userProfileService.createOrUpdate(userProfile, function (err, res) {
            processActorGroup(moviesGrouped, i + 1, done);
        });
    }
    else done(null, true);
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

var getGenreScoreRelevance = function (size) {
    return (110 / (1 + Math.exp(-0.16 * (size - 15)))) - 10;
}

var getDirectorScoreRelevance = function (size) {
    return (110 / (1 + Math.exp(-0.6 * (size - 3)))) - 10;
}

module.exports = wtwTasks;