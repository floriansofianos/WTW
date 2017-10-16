var userService = require('../helpers/userService')();
var movieQuestionnaireService = require('../helpers/movieQuestionnaireService')();
var movieCacheService = require('../helpers/movieCacheService')();
var movieDBService = require('../helpers/movieDBService')();
var userProfileService = require('../helpers/userProfileService')();
var userQuestionnaireService = require('../helpers/userQuestionnaireService')();
var movieRecommandationService = require('../helpers/movieRecommandationservice')();
var _ = require('underscore');

var wtwTasks = function (job, done) {
    console.log('Starting the WTW Tasks');
    console.log('Starting generating profiles...');
    generateUsersProfile(function (err, res) {
        console.log('Starting generating questionnaires...');
        generateUsersQuestionnaires(function (err, res) {
            generateUsersRecommandations(function (err, res) {
                console.log('Finished!');
            });
        });
    });
    // call done when finished
    done();
}

var generateUsersRecommandations = function (done) {
    // Retrieve all the users that need more recommandations
    userService.getUsersForRecommandationRefresh(function (err, users) {
        generateRecommandations(users, 0, done);
    });
}

var generateRecommandations = function (users, i, done) {
    if (i < users.length) {
        var u = users[i];
        console.log('Starting generating recommandations for ' + u.username + '...');
        // Get all existing questionnaires and profiles
        movieQuestionnaireService.getAll(u.id, function (err, questionnaires) {
            userProfileService.getAll(u.id, function (err, profiles) {
                movieRecommandationService.getAll(u.id, function (err, movieRecommandations) {
                    var filteredProfiles = _.filter(profiles, function (p) { return p.scoreRelevance > 50 });
                    var filteredQuestionnaires = _.filter(questionnaires, function (q) { return !q.isSkipped; })
                    // Check favourite directors
                    var directorsProfiles = _.filter(filteredProfiles, function (p) { return p.directorId && p.score > 65; });
                    generateDirectorRecommandations(_.map(directorsProfiles, 'directorId'), questionnaires, movieRecommandations, u.id, 0, function (err, res) {
                        // Check favourite writers
                        var writersProfiles = _.filter(filteredProfiles, function (p) { return p.writerId && p.score > 65; });
                        generateWriterRecommandations(_.map(writersProfiles, 'writerId'), questionnaires, movieRecommandations, u.id, 0, function (err, res) {
                            // Check favourite genres
                            var genresProfiles = _.filter(filteredProfiles, function (p) { return p.genreId && p.score > 85; });
                            generateGenreRecommandations(_.map(writersProfiles, 'genreId'), questionnaires, movieRecommandations, u.id, 0, function (err, res) {
                                // Check favourite genres
                                var actorsProfiles = _.filter(filteredProfiles, function (p) { return p.genreId && p.score > 85; });
                                generateActorRecommandations(_.map(actorsProfiles, 'castId'), questionnaires, movieRecommandations, u.id, 0, function (err, res) {
                                    generateRecommandations(users, i + 1, done);
                                });
                            });
                        });
                    });
                });
            });
        });
    }
    else done(null, true);
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
                    generateGenreQuestionnaire(_.map(filteredGenreProfiles, 'genreId'), questionnaires, userQuestionnaires, u.id, 0, function (err, res) {
                        // Deal with directors
                        console.log('Generating questionnaires for directors...');
                        var filteredDirectorsProfiles = _.filter(profiles, function (p) { return p.scoreRelevance < 50 && p.directorId != null; });
                        generateDirectorQuestionnaire(_.map(filteredDirectorsProfiles, 'directorId'), questionnaires, userQuestionnaires, u.id, 0, function (err, res) {
                            // Deal with writers
                            console.log('Generating questionnaires for writers...');
                            var filteredWritersProfiles = _.filter(profiles, function (p) { return p.scoreRelevance < 50 && p.writerId != null; });
                            generateWriterQuestionnaire(_.map(filteredWritersProfiles, 'writerId'), questionnaires, userQuestionnaires, u.id, 0, function (err, res) {
                                // Deal with actors
                                console.log('Generating questionnaires for actors...');
                                var filteredActorsProfiles = _.filter(profiles, function (p) { return p.scoreRelevance < 50 && p.castId != null; });
                                generateActorQuestionnaire(_.map(filteredActorsProfiles, 'castId'), questionnaires, userQuestionnaires, u.id, function (err, res) {
                                    // Done!
                                    generateQuestionnaires(users, i + 1, done);
                                });
                            });
                        });
                    });
                });
            });
        });
    }
    else done(null, true);
}

var generateGenreQuestionnaire = function (genreIds, questionnaires, userQuestionnaires, userId, i, done) {
    if (i < genreIds.length) {
        var genreId = genreIds[i];
        // get movieDB movies
        movieDBService.getMoviesForGenreQuestionnaire(genreId, function (err, data) {
            if (data && data.results) {
                handleData(data.results, questionnaires, userQuestionnaires, userId, 0, 5, function (err, res) {
                    generateGenreQuestionnaire(genreIds, questionnaires, userQuestionnaires, userId, i + 1, done);
                });
            }
            else generateGenreQuestionnaire(genreIds, questionnaires, userQuestionnaires, userId, i + 1, done);
        });
    }
    else done(null, true);
}

var handleData = function (allMovies, questionnaires, userQuestionnaires, userId, i, limitAdd, done) {
    if (i < allMovies.length) {
        var m = allMovies[i];
        if (!_.find(questionnaires, function (q) { return q.movieDBId == m.id }) && !_.find(userQuestionnaires, function (q) { return q.movieDBId == m.id; }) && limitAdd > 0) {
            userQuestionnaireService.create(userId, m.id, function (err, data) {
                handleData(allMovies, questionnaires, userQuestionnaires, userId, i + 1, limitAdd - 1, done);
            });
        }
        else handleData(allMovies, questionnaires, userQuestionnaires, userId, i + 1, limitAdd, done);
    }
    else done(null, true);
}

var handleDataRecommandations = function (allMovies, questionnaires, movieRecommandations, userId, i, limitAdd, done) {
    if (i < allMovies.length) {
        var m = allMovies[i];
        if (!_.find(questionnaires, function (q) { return q.movieDBId == m.id }) && !_.find(movieRecommandations, function (q) { return q.movieDBId == m.id; }) && limitAdd > 0) {
            movieRecommandationService.create(userId, m.id, function (err, data) {
                handleDataRecommandations(allMovies, questionnaires, movieRecommandations, userId, i + 1, limitAdd - 1, done);
            });
        }
        else handleDataRecommandations(allMovies, questionnaires, movieRecommandations, userId, i + 1, limitAdd, done);
    }
    else done(null, true);
}

var generateDirectorQuestionnaire = function (directorIds, questionnaires, userQuestionnaires, userId, i, done) {
    if (i < directorIds.length) {
        var directorId = directorIds[i];
        // get movieDB movies
        movieDBService.getMoviesForDirectorQuestionnaire(directorId, 1, function (err, data) {
            if (data && data.results) {
                movieDBService.filterOutDirectorData(directorId, data, 0, function (err, res) {
                    data = res;
                    if (data.results.length > 0) {
                        handleData(data.results, questionnaires, userQuestionnaires, userId, 0, 3, function (err, res) {
                            generateDirectorQuestionnaire(directorIds, questionnaires, userQuestionnaires, userId, i + 1, done);
                        });
                    }
                    else generateDirectorQuestionnaire(directorIds, questionnaires, userQuestionnaires, userId, i + 1, done);
                });
            }
            else generateDirectorQuestionnaire(directorIds, questionnaires, userQuestionnaires, userId, i + 1, done);
        });
    }
    else done(null, true);
}

var generateDirectorRecommandations = function (directorIds, questionnaires, movieRecommandations, userId, i, done) {
    if (i < directorIds.length) {
        var directorId = directorIds[i];
        // get movieDB movies
        movieDBService.getMoviesForDirectorQuestionnaire(directorId, 1, function (err, data) {
            if (data && data.results) {
                movieDBService.filterOutDirectorData(directorId, data, 0, function (err, res) {
                    data = res;
                    if (data.results.length > 0) {
                        handleDataRecommandations(data.results, questionnaires, movieRecommandations, userId, 0, 1, function (err, res) {
                            generateDirectorRecommandations(directorIds, questionnaires, movieRecommandations, userId, i + 1, done);
                        });
                    }
                    else generateDirectorRecommandations(directorIds, questionnaires, userQuestionnaires, userId, i + 1, done);
                });
            }
            else generateDirectorRecommandations(directorIds, questionnaires, userQuestionnaires, userId, i + 1, done);
        });
    }
    else done(null, true);
}

var generateWriterRecommandations = function (writerIds, questionnaires, movieRecommandations, userId, i, done) {
    if (i < writerIds.length) {
        var writerId = writerIds[i];
        // get movieDB movies
        movieDBService.getMoviesForWriterQuestionnaire(writerId, 1, function (err, data) {
            if (data && data.results) {
                movieDBService.filterOutWriterData(writerId, data, 0, function (err, res) {
                    data = res;
                    if (data.results.length > 0) {
                        handleDataRecommandations(data.results, questionnaires, movieRecommandations, userId, 0, 1, function (err, res) {
                            generateWriterRecommandations(writerIds, questionnaires, movieRecommandations, userId, i + 1, done);
                        });
                    }
                    else generateWriterRecommandations(writerIds, questionnaires, userQuestionnaires, userId, i + 1, done);
                });
            }
            else generateWriterRecommandations(writerIds, questionnaires, userQuestionnaires, userId, i + 1, done);
        });
    }
    else done(null, true);
}

var generateGenreRecommandations = function (genreIds, questionnaires, movieRecommandations, userId, i, done) {
    if (i < genreIds.length) {
        var genreId = genreIds[i];
        // get movieDB movies
        movieDBService.getMoviesForGenreQuestionnaire(genreId, function (err, data) {
            if (data && data.results) {
                handleDataRecommandations(data.results, questionnaires, movieRecommandations, userId, 0, 3, function (err, res) {
                    generateGenreRecommandations(genreIds, questionnaires, movieRecommandations, userId, i + 1, done);
                });
            }
            else generateGenreRecommandations(genreIds, questionnaires, userQuestionnaires, userId, i + 1, done);
        });
    }
    else done(null, true);
}

var generateActorRecommandations = function (actorIds, questionnaires, movieRecommandations, userId, i, done) {
    if (i < actorIds.length) {
        var actorId = actorIds[i];
        // get movieDB movies
        movieDBService.getMoviesForActorQuestionnaire(actorId, function (err, data) {
            if (data && data.results) {
                handleDataRecommandations(data.results, questionnaires, movieRecommandations, userId, 0, 2, function (err, res) {
                    generateActorRecommandations(actorIds, questionnaires, movieRecommandations, userId, i + 1, done);
                });
            }
            else generateActorRecommandations(actorIds, questionnaires, userQuestionnaires, userId, i + 1, done);
        });
    }
    else done(null, true);
}

var generateWriterQuestionnaire = function (writerIds, questionnaires, userQuestionnaires, userId, i, done) {
    if (i < writerIds.length) {
        var writerId = writerIds[i];
        // get movieDB movies
        movieDBService.getMoviesForWriterQuestionnaire(writerId, 1, function (err, data) {
            if (data && data.results) {
                movieDBService.filterOutWriterData(writerId, data, 0, function (err, res) {
                    data = res;
                    if (data.results.length > 0) {
                        handleData(data.results, questionnaires, userQuestionnaires, userId, 0, 3, function (err, res) {
                            generateWriterQuestionnaire(writerIds, questionnaires, userQuestionnaires, userId, i + 1, done);
                        });
                    }
                    else generateWriterQuestionnaire(writerIds, questionnaires, userQuestionnaires, userId, i + 1, done);
                });
            }
            else generateWriterQuestionnaire(writerIds, questionnaires, userQuestionnaires, userId, i + 1, done);
        });
    }
    else done(null, true);
}



var generateActorQuestionnaire = function (castIds, questionnaires, userQuestionnaires, userId, done) {
    if (castIds.length < 1) done(null, true);
    else {
        // get movieDB movies
        movieDBService.getMoviesForActorQuestionnaire(castIds, function (err, data) {
            if (data && data.results) {
                handleData(data.results, questionnaires, userQuestionnaires, userId, 0, 2, function (err, res) {
                    done(null, true);
                });
            }
            else done(null, true);
        });
    }
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
                    processMovieGenreGroups(moviesGrouped, u.id, function (err, res) {

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
                        processMovieDirectorGroups(moviesGrouped, u.id, function (err, res) {

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
                            processMovieWriterGroups(moviesGrouped, u.id, function (err, res) {

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
                                processMovieActorGroups(moviesGrouped, u.id, function (err, res) {
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


var processMovieGenreGroups = function (moviesGrouped, userId, done) {
    processGenreGroup(moviesGrouped, 0, userId, done);
}

var processGenreGroup = function (moviesGrouped, i, userId, done) {
    if (i < _.size(moviesGrouped)) {
        var g = moviesGrouped[Object.keys(moviesGrouped)[i]];
        var userProfile = {
            userId: userId,
            name: g[0].name,
            genreId: g[0].genreId,
            score: (_.reduce(g, function (memo, m) { return memo + m.score; }, 0)) / (_.size(g)),
            scoreRelevance: getGenreScoreRelevance(_.size(g))
        }
        userProfileService.createOrUpdate(userProfile, function (err, res) {
            processGenreGroup(moviesGrouped, i + 1, userId, done);
        });
    }
    else done(null, true);
}

var processMovieDirectorGroups = function (moviesGrouped, userId, done) {
    processDirectorGroup(moviesGrouped, 0, userId, done);
}

var processDirectorGroup = function (moviesGrouped, i, userId, done) {
    if (i < _.size(moviesGrouped)) {
        var g = moviesGrouped[Object.keys(moviesGrouped)[i]];
        var userProfile = {
            userId: userId,
            name: g[0].name,
            directorId: g[0].directorId,
            score: (_.reduce(g, function (memo, m) { return memo + m.score; }, 0)) / (_.size(g)),
            scoreRelevance: getDirectorScoreRelevance(_.size(g))
        }
        userProfileService.createOrUpdate(userProfile, function (err, res) {
            processDirectorGroup(moviesGrouped, i + 1, userId, done);
        });
    }
    else done(null, true);
}

var processMovieWriterGroups = function (moviesGrouped, userId, done) {
    processWriterGroup(moviesGrouped, 0, userId, done);
}

var processWriterGroup = function (moviesGrouped, i, userId, done) {
    if (i < _.size(moviesGrouped)) {
        var g = moviesGrouped[Object.keys(moviesGrouped)[i]];
        var userProfile = {
            userId: userId,
            name: g[0].name,
            writerId: g[0].writerId,
            score: (_.reduce(g, function (memo, m) { return memo + m.score; }, 0)) / (_.size(g)),
            scoreRelevance: getDirectorScoreRelevance(_.size(g))
        }
        userProfileService.createOrUpdate(userProfile, function (err, res) {
            processWriterGroup(moviesGrouped, i + 1, userId, done);
        });
    }
    else done(null, true);
}

var processMovieActorGroups = function (moviesGrouped, userId, done) {
    processActorGroup(moviesGrouped, 0, userId, done);
}

var processActorGroup = function (moviesGrouped, i, userId, done) {
    if (i < _.size(moviesGrouped)) {
        var g = moviesGrouped[Object.keys(moviesGrouped)[i]];
        var userProfile = {
            userId: userId,
            name: g[0].name,
            castId: g[0].castId,
            score: (_.reduce(g, function (memo, m) { return memo + m.score; }, 0)) / (_.size(g)),
            scoreRelevance: getGenreScoreRelevance(_.size(g))
        }
        userProfileService.createOrUpdate(userProfile, function (err, res) {
            processActorGroup(moviesGrouped, i + 1, userId, done);
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