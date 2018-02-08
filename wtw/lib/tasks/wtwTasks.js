var userService = require('../helpers/userService')();
var movieQuestionnaireService = require('../helpers/movieQuestionnaireService')();
var tvQuestionnaireService = require('../helpers/tvQuestionnaireService')();
var movieCacheService = require('../helpers/movieCacheService')();
var tvCacheService = require('../helpers/tvCacheService')();
var movieDBService = require('../helpers/movieDBService')();
var userProfileService = require('../helpers/userProfileService')();
var userQuestionnaireService = require('../helpers/userQuestionnaireService')();
var userTVQuestionnaireService = require('../helpers/userTVQuestionnaireService')();
var movieRecommandationService = require('../helpers/movieRecommandationservice')();
var tvRecommandationService = require('../helpers/tvRecommandationservice')();
var friendshipService = require('../helpers/friendshipService')();
var plexService = require('../helpers/plexService')();
var _ = require('underscore');

var wtwTasks = function (job, done) {
    wtwProcess(0, function () {
        // We do not care about what happens when this finishes since we are in an infinite loop
    });
    plexService.getAllPlexServers(function (err, servers) {
        _.each(servers, function (s) {
            plexService.updateAllPlexMovies(s, function (err, result) { });
            plexService.updateAllPlexTVShows(s, function (err, result) { });
        });
    });
    movieDBService.retrieveAndStoreTVShows(function (err, data) {
        if (err) {
            var testts = err;
        }
    });
    done();
}

var wtwProcess = function (i, done) {
    console.log('Starting the WTW Tasks');
    console.log('Starting generating profiles...');
    generateUsersProfile(function (err, res) {
        console.log('Starting generating questionnaires...');
        generateUsersQuestionnaires(function (err, res) {
            generateUsersRecommandations(function (err, res) {
                console.log('Finished!');
                setTimeout(function () {
                    wtwProcess(i + 1, done);;
                }, 300000);
            });
        });
    });
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
            // Filter out questionnaires: if a movie is skipped we can still recommend it
            questionnaires = _.filter(questionnaires, function(q) { return !q.isSkipped });
            userProfileService.getAll(u.id, function (err, profiles) {
                movieRecommandationService.getAll(u.id, function (err, movieRecommandations) {
                    // We need to retrieve all the credits for the recommandations because we don't want to recommend the same writer/director over and over again.
                    getAllCredits(movieRecommandations, 0, function (err, movieRecommandations) {
                        var alreadyRecommandedDirectors = [].concat.apply([], _.map(movieRecommandations, function (r) { return _.map(r.directors, function (d) { return d.id }) }));
                        var alreadyRecommandedWriters = [].concat.apply([], _.map(movieRecommandations, function (r) { return _.map(r.writers, function (d) { return d.id }) }));
                        var filteredProfiles = _.filter(profiles, function (p) { return p.scoreRelevance > 50 });
                        var filteredQuestionnaires = _.filter(questionnaires, function (q) { return !q.isSkipped; })
                        // Check favourite directors
                        var directorsProfiles = _.filter(filteredProfiles, function (p) { return p.directorId && p.score > 65 && _.size(_.filter(alreadyRecommandedDirectors), function (d) { return d == p.directorId}) < 2; });
                        generateDirectorRecommandations(_.map(directorsProfiles, 'directorId'), questionnaires, movieRecommandations, movieDBService.getRatingCertification(u.yearOfBirth), u.id, 0, function (err, res) {
                            // Check favourite writers
                            var writersProfiles = _.filter(filteredProfiles, function (p) { return p.writerId && p.score > 65 && _.size(_.filter(alreadyRecommandedWriters), function (d) { return d == p.writerId }) < 2; });
                            generateWriterRecommandations(_.map(writersProfiles, 'writerId'), questionnaires, movieRecommandations, movieDBService.getRatingCertification(u.yearOfBirth), u.id, 0, function (err, res) {
                                // Check favourite genres
                                var seenCountForGenres = _.reduce(_.filter(filteredProfiles, function (p) { return p.genreId; }), function (memo, p) { return memo + p.seenCount; }, 0);
                                var numberOfGenres = _.size(_.filter(filteredProfiles, function (p) { return p.genreId; }));
                                var seenCountAverage = numberOfGenres == 0 ? 0 : (seenCountForGenres / numberOfGenres);
                                var genresProfiles = _.filter(filteredProfiles, function (p) { return p.genreId && (p.score > 85 || ((p.seenCount - seenCountAverage) > (seenCountAverage / 2) && p.score > 40)); });
                                generateGenreRecommandations(_.map(writersProfiles, 'genreId'), questionnaires, movieRecommandations, movieDBService.getRatingCertification(u.yearOfBirth), u.id, 0, function (err, res) {
                                    // Check favourite actors
                                    var actorsProfiles = _.filter(filteredProfiles, function (p) { return p.castId && p.score > 85; });
                                    generateActorRecommandations(_.map(actorsProfiles, 'castId'), questionnaires, movieRecommandations, movieDBService.getRatingCertification(u.yearOfBirth), u.id, 0, function (err, res) {
                                        // Check favourite countries or countries that we like to watch (lots of seenCount)
                                        var countriesProfiles = _.filter(filteredProfiles, function (p) { return (p.country && p.score > 85) || (p.country && p.country != 'en' && p.seenCount > 10); });
                                        generateCountryRecommandations(_.map(countriesProfiles, 'country'), questionnaires, movieRecommandations, movieDBService.getRatingCertification(u.yearOfBirth), u.id, 0, function (err, res) {
                                            generateSimilarMovieRecommandations(_.map(_.filter(questionnaires, function (q) { return q.isSeen && q.rating == 5 }), 'movieDBId'), questionnaires, movieRecommandations, u.id, 0, function (err, res) {
                                                var followingUserIds = friendshipService.getAllFollowings(u.id, function (err, res) {
                                                    generateFollowingRecommandations(_.map(res, 'friendUserId'), questionnaires, movieRecommandations, movieDBService.getRatingCertification(u.yearOfBirth), u.id, 0, function (err, res) {
                                                        generateRecommandations(users, i + 1, done);
                                                    });
                                                });
                                            });
                                        });
                                    });
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

var getAllCredits = function (reco, i, done) {
    if (i < reco.length) {
        var movieId = reco[i].movieDBId;
        movieDBService.getMovieCredits(movieId, function (err, credits) {
            if (err) return done(err);
            else {
                reco[i].directors = movieDBService.getDirectors(credits);
                reco[i].writers = movieDBService.getWriters(credits);
                getAllCredits(reco, i + 1, done);
            }
        });
    }
    else done(null, reco);
}

var generateUsersQuestionnaires = function (done) {
    // Retrieve all the users that need more questionnaires
    userService.getUsersForQuestionnaireRefresh(function (err, users) {
        generateQuestionnaires(users, 0, done);
    });
}

var generateUsersTVQuestionnaires = function (done) {
    // Retrieve all the users that need more questionnaires
    userService.getUsersForTVQuestionnaireRefresh(function (err, users) {
        generateTVQuestionnaires(users, 0, done);
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
                    var filteredGenreProfiles = _.filter(profiles, function (p) { return p.scoreRelevance < 100 && p.genreId != null; });
                    generateGenreQuestionnaire(_.map(filteredGenreProfiles, 'genreId'), questionnaires, userQuestionnaires, movieDBService.getRatingCertification(u.yearOfBirth), u.id, 0, function (err, res) {
                        // Deal with directors
                        console.log('Generating questionnaires for directors...');
                        var filteredDirectorsProfiles = _.filter(profiles, function (p) { return p.scoreRelevance < 100 && p.directorId != null; });
                        generateDirectorQuestionnaire(_.map(filteredDirectorsProfiles, 'directorId'), questionnaires, userQuestionnaires, movieDBService.getRatingCertification(u.yearOfBirth), u.id, 0, function (err, res) {
                            // Deal with writers
                            console.log('Generating questionnaires for writers...');
                            var filteredWritersProfiles = _.filter(profiles, function (p) { return p.scoreRelevance < 100 && p.writerId != null; });
                            generateWriterQuestionnaire(_.map(filteredWritersProfiles, 'writerId'), questionnaires, userQuestionnaires, movieDBService.getRatingCertification(u.yearOfBirth), u.id, 0, function (err, res) {
                                // Deal with actors
                                console.log('Generating questionnaires for actors...');
                                var filteredActorsProfiles = _.filter(profiles, function (p) { return p.scoreRelevance < 100 && p.castId != null; });
                                generateActorQuestionnaire(_.map(filteredActorsProfiles, 'castId'), questionnaires, userQuestionnaires, movieDBService.getRatingCertification(u.yearOfBirth), u.id, function (err, res) {
                                    // Deal with countries
                                    console.log('Generating questionnaires for countries...');
                                    var filteredCountriesProfiles = _.filter(profiles, function (p) { return p.scoreRelevance < 100 && p.country != null; });
                                    generateCountryQuestionnaire(_.map(filteredCountriesProfiles, 'country'), questionnaires, userQuestionnaires, movieDBService.getRatingCertification(u.yearOfBirth), u.id, 0, function (err, res) {
                                        // Done!
                                        generateQuestionnaires(users, i + 1, done);
                                    });
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

var generateTVQuestionnaires = function (users, i, done) {
    if (i < users.length) {
        var u = users[i];
        console.log('Starting generating tv questionnaires for ' + u.username + '...');
        // Get all existing questionnaires and profiles
        tvQuestionnaireService.getAll(u.id, function (err, questionnaires) {
            userProfileService.getAll(u.id, function (err, profiles) {
                userTVQuestionnaireService.getAll(u.id, function (err, userQuestionnaires) {
                    // Deal with genres
                    var filteredGenreProfiles = _.filter(profiles, function (p) { return p.scoreRelevance < 100 && p.genreId != null; });
                    generateGenreTVQuestionnaire(_.map(filteredGenreProfiles, 'genreId'), questionnaires, userQuestionnaires, movieDBService.getRatingCertification(u.yearOfBirth), u.id, 0, function (err, res) {
                        // Deal with creators
                        console.log('Generating questionnaires for directors...');
                        var filteredCreatorsProfiles = _.filter(profiles, function (p) { return p.scoreRelevance < 100 && p.creatorId != null; });
                        generateTVCreatorQuestionnaire(_.map(filteredDirectorsProfiles, 'creatorId'), questionnaires, userQuestionnaires, movieDBService.getRatingCertification(u.yearOfBirth), u.id, 0, function (err, res) {
                            // Deal with writers
                            console.log('Generating questionnaires for writers...');
                            var filteredWritersProfiles = _.filter(profiles, function (p) { return p.scoreRelevance < 100 && p.writerId != null; });
                            generateTVWriterQuestionnaire(_.map(filteredWritersProfiles, 'writerId'), questionnaires, userQuestionnaires, movieDBService.getRatingCertification(u.yearOfBirth), u.id, 0, function (err, res) {
                                // Deal with actors
                                console.log('Generating questionnaires for actors...');
                                var filteredActorsProfiles = _.filter(profiles, function (p) { return p.scoreRelevance < 100 && p.castId != null; });
                                generateActorQuestionnaire(_.map(filteredActorsProfiles, 'castId'), questionnaires, userQuestionnaires, movieDBService.getRatingCertification(u.yearOfBirth), u.id, function (err, res) {
                                    // Deal with countries
                                    console.log('Generating questionnaires for countries...');
                                    var filteredCountriesProfiles = _.filter(profiles, function (p) { return p.scoreRelevance < 100 && p.country != null; });
                                    generateCountryQuestionnaire(_.map(filteredCountriesProfiles, 'country'), questionnaires, userQuestionnaires, movieDBService.getRatingCertification(u.yearOfBirth), u.id, 0, function (err, res) {
                                        // Done!
                                        generateQuestionnaires(users, i + 1, done);
                                    });
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

var generateGenreQuestionnaire = function (genreIds, questionnaires, userQuestionnaires, certification, userId, i, done) {
    if (i < genreIds.length) {
        var genreId = genreIds[i];
        // get movieDB movies
        movieDBService.getMoviesForGenreQuestionnaire(genreId, null, null, null, certification, function (err, data) {
            if (data && data.results) {
                handleData(data.results, questionnaires, userQuestionnaires, userId, 0, 1, function (err, res) {
                    generateGenreQuestionnaire(genreIds, questionnaires, userQuestionnaires, certification, userId, i + 1, done);
                });
            }
            else generateGenreQuestionnaire(genreIds, questionnaires, userQuestionnaires, certification, userId, i + 1, done);
        });
    }
    else done(null, true);
}

var generateGenreTVQuestionnaire = function (genreIds, questionnaires, userQuestionnaires, certification, userId, i, done) {
    if (i < genreIds.length) {
        var genreId = genreIds[i];
        // get movieDB tv shows
        movieDBService.getTVShowsForGenreQuestionnaire(genreId, null, null, null, certification, function (err, data) {
            if (data && data.length > 0) {
                handleTVData(data, questionnaires, userQuestionnaires, userId, 0, 1, function (err, res) {
                    generateGenreTVQuestionnaire(genreIds, questionnaires, userQuestionnaires, certification, userId, i + 1, done);
                });
            }
            else generateGenreTVQuestionnaire(genreIds, questionnaires, userQuestionnaires, certification, userId, i + 1, done);
        });
    }
    else done(null, true);
}

var generateTVCreatorQuestionnaire = function (creatorIds, questionnaires, userQuestionnaires, certification, userId, i, done) {
    if (i < creatorIds.length) {
        var creatorId = creatorIds[i];
        // get movieDB tv shows
        movieDBService.getTVShowsForCreatorQuestionnaire(creatorId, function (err, data) {
            if (data && data.length > 0) {
                handleTVData(data, questionnaires, userQuestionnaires, userId, 0, 3, function (err, res) {
                    generateTVCreatorQuestionnaire(creatorIds, questionnaires, userQuestionnaires, certification, userId, i + 1, done);
                });
            }
            else generateTVCreatorQuestionnaire(creatorIds, questionnaires, userQuestionnaires, certification, userId, i + 1, done);
        });
    }
    else done(null, true);
}

var handleData = function (allMovies, questionnaires, userQuestionnaires, userId, i, limitAdd, done) {
    if (i < allMovies.length) {
        var m = allMovies[i];
        if (!_.find(questionnaires, function (q) { return q.movieDBId == m.id }) && !_.find(userQuestionnaires, function (q) { return q.movieDBId == m.id; }) && limitAdd > 0 && !m.video && new Date(m.release_date) < new Date()) {
            userQuestionnaireService.create(userId, m.id, function (err, data) {
                handleData(allMovies, questionnaires, userQuestionnaires, userId, i + 1, limitAdd - 1, done);
            });
        }
        else handleData(allMovies, questionnaires, userQuestionnaires, userId, i + 1, limitAdd, done);
    }
    else done(null, true);
}

var handleTVData = function (allMovies, questionnaires, userQuestionnaires, userId, i, limitAdd, done) {
    if (i < allMovies.length) {
        var m = allMovies[i].data;
        if (!_.find(questionnaires, function (q) { return q.movieDBId == m.id }) && !_.find(userQuestionnaires, function (q) { return q.movieDBId == m.id; }) && limitAdd > 0 && new Date(m.release_date) < new Date()) {
            userTVQuestionnaireService.create(userId, m.id, function (err, data) {
                handleTVData(allMovies, questionnaires, userQuestionnaires, userId, i + 1, limitAdd - 1, done);
            });
        }
        else handleTVData(allMovies, questionnaires, userQuestionnaires, userId, i + 1, limitAdd, done);
    }
    else done(null, true);
}

var handleDataRecommandations = function (allMovies, questionnaires, movieRecommandations, userId, i, limitAdd, done) {
    if (i < allMovies.length) {
        var m = allMovies[i];
        if (!_.find(questionnaires, function (q) { return q.movieDBId == m.id }) && !_.find(movieRecommandations, function (q) { return q.movieDBId == m.id; }) && limitAdd > 0 && !m.video && new Date(m.release_date) < new Date()) {
            movieRecommandationService.create(userId, m.id, function (err, data) {
                handleDataRecommandations(allMovies, questionnaires, movieRecommandations, userId, i + 1, limitAdd - 1, done);
            });
        }
        else handleDataRecommandations(allMovies, questionnaires, movieRecommandations, userId, i + 1, limitAdd, done);
    }
    else done(null, true);
}

var generateDirectorQuestionnaire = function (directorIds, questionnaires, userQuestionnaires, certification, userId, i, done) {
    if (i < directorIds.length) {
        var directorId = directorIds[i];
        // get movieDB movies
        movieDBService.getMoviesForDirectorQuestionnaire(directorId, null, null, null, certification, 1, function (err, data) {
            if (data && data.results) {
                movieDBService.filterOutDirectorData(directorId, data, 0, function (err, res) {
                    data = res;
                    if (data.results.length > 0) {
                        handleData(data.results, questionnaires, userQuestionnaires, userId, 0, 3, function (err, res) {
                            generateDirectorQuestionnaire(directorIds, questionnaires, userQuestionnaires, certification, userId, i + 1, done);
                        });
                    }
                    else generateDirectorQuestionnaire(directorIds, questionnaires, userQuestionnaires, certification, userId, i + 1, done);
                });
            }
            else generateDirectorQuestionnaire(directorIds, questionnaires, userQuestionnaires, certification, userId, i + 1, done);
        });
    }
    else done(null, true);
}

var generateDirectorRecommandations = function (directorIds, questionnaires, movieRecommandations, certification, userId, i, done) {
    if (i < directorIds.length) {
        var directorId = directorIds[i];
        // get movieDB movies
        movieDBService.getMoviesForDirectorQuestionnaire(directorId, null, null, null, certification, 1, function (err, data) {
            if (data && data.results) {
                movieDBService.filterOutDirectorData(directorId, data, 0, function (err, res) {
                    data = res;
                    if (data.results.length > 0) {
                        handleDataRecommandations(data.results, questionnaires, movieRecommandations, userId, 0, 1, function (err, res) {
                            generateDirectorRecommandations(directorIds, questionnaires, movieRecommandations, certification, userId, i + 1, done);
                        });
                    }
                    else generateDirectorRecommandations(directorIds, questionnaires, movieRecommandations, certification, userId, i + 1, done);
                });
            }
            else generateDirectorRecommandations(directorIds, questionnaires, movieRecommandations, certification, userId, i + 1, done);
        });
    }
    else done(null, true);
}

var generateWriterRecommandations = function (writerIds, questionnaires, movieRecommandations, certification, userId, i, done) {
    if (i < writerIds.length) {
        var writerId = writerIds[i];
        // get movieDB movies
        movieDBService.getMoviesForWriterQuestionnaire(writerId, null, null, null, certification, 1, function (err, data) {
            if (data && data.results) {
                movieDBService.filterOutWriterData(writerId, data, 0, function (err, res) {
                    data = res;
                    if (data.results.length > 0) {
                        handleDataRecommandations(data.results, questionnaires, movieRecommandations, userId, 0, 1, function (err, res) {
                            generateWriterRecommandations(writerIds, questionnaires, movieRecommandations, certification, userId, i + 1, done);
                        });
                    }
                    else generateWriterRecommandations(writerIds, questionnaires, movieRecommandations, certification, userId, i + 1, done);
                });
            }
            else generateWriterRecommandations(writerIds, questionnaires, movieRecommandations, certification, userId, i + 1, done);
        });
    }
    else done(null, true);
}

var generateGenreRecommandations = function (genreIds, questionnaires, movieRecommandations, certification, userId, i, done) {
    if (i < genreIds.length) {
        var genreId = genreIds[i];
        // get movieDB movies
        movieDBService.getMoviesForGenreQuestionnaire(genreId, null, null, null, certification, function (err, data) {
            if (data && data.results) {
                handleDataRecommandations(data.results, questionnaires, movieRecommandations, userId, 0, 3, function (err, res) {
                    generateGenreRecommandations(genreIds, questionnaires, movieRecommandations, certification, userId, i + 1, done);
                });
            }
            else generateGenreRecommandations(genreIds, questionnaires, movieRecommandations, certification, userId, i + 1, done);
        });
    }
    else done(null, true);
}

var generateActorRecommandations = function (actorIds, questionnaires, movieRecommandations, certification, userId, i, done) {
    if (i < actorIds.length) {
        var actorId = actorIds[i];
        // get movieDB movies
        movieDBService.getMoviesForActorQuestionnaire(actorId, null, null, null, certification, function (err, data) {
            if (data && data.results) {
                handleDataRecommandations(data.results, questionnaires, movieRecommandations, userId, 0, 2, function (err, res) {
                    generateActorRecommandations(actorIds, questionnaires, movieRecommandations, certification, userId, i + 1, done);
                });
            }
            else generateActorRecommandations(actorIds, questionnaires, movieRecommandations, certification, userId, i + 1, done);
        });
    }
    else done(null, true);
}

var generateCountryRecommandations = function (countries, questionnaires, movieRecommandations, certification, userId, i, done) {
    if (i < countries.length) {
        var country = countries[i];
        // get movieDB movies
        movieDBService.getMoviesForCountryQuestionnaire(country, null, null, certification, function (err, data) {
            if (data && data.results) {
                handleDataRecommandations(data.results, questionnaires, movieRecommandations, userId, 0, 2, function (err, res) {
                    generateCountryRecommandations(countries, questionnaires, movieRecommandations, certification, userId, i + 1, done);
                });
            }
            else generateCountryRecommandations(countries, questionnaires, movieRecommandations, certification, userId, i + 1, done);
        });
    }
    else done(null, true);
}

var generateFollowingRecommandations = function (followingUserIds, questionnaires, movieRecommandations, certification, userId, i, done) {
    if (i < followingUserIds.length) {
        var followingUserId = followingUserIds[i];
        // get movieDB movies
        movieQuestionnaireService.getSampleLikedMovies(followingUserId, function (err, data) {
            if (data && data.length > 0) {
                var movieIds = _.map(data, 'movieDBId');
                movieDBService.getAllMovies(movieIds, 'en', movieCacheService, function (err, data) {
                    if (data) {
                        handleDataRecommandations(data, questionnaires, movieRecommandations, userId, 0, 2, function (err, res) {
                            generateFollowingRecommandations(followingUserIds, questionnaires, movieRecommandations, certification, userId, i + 1, done);
                        });
                    }
                    else generateFollowingRecommandations(followingUserIds, questionnaires, movieRecommandations, certification, userId, i + 1, done);
                });
            }
            else generateFollowingRecommandations(followingUserIds, questionnaires, movieRecommandations, certification, userId, i + 1, done);
        });
    }
    else done(null, true);
}

var generateSimilarMovieRecommandations = function (movieIds, questionnaires, movieRecommandations, userId, i, done) {
    if (i < movieIds.length) {
        var movieId = movieIds[i];
        // get movieDB similar movies
        movieDBService.getSimilarMovies(movieId, function (err, data) {
            if (data && data.results) {
                handleDataRecommandations(data.results, questionnaires, movieRecommandations, userId, 0, 1, function (err, res) {
                    generateSimilarMovieRecommandations(movieIds, questionnaires, movieRecommandations, userId, i + 1, done);
                });
            }
            else generateSimilarMovieRecommandations(movieIds, questionnaires, movieRecommandations, userId, i + 1, done);
        });
    }
    else done(null, true);
}

var generateWriterQuestionnaire = function (writerIds, questionnaires, userQuestionnaires, certification, userId, i, done) {
    if (i < writerIds.length) {
        var writerId = writerIds[i];
        // get movieDB movies
        movieDBService.getMoviesForWriterQuestionnaire(writerId, null, null, null, certification, 1, function (err, data) {
            if (data && data.results) {
                movieDBService.filterOutWriterData(writerId, data, 0, function (err, res) {
                    data = res;
                    if (data.results.length > 0) {
                        handleData(data.results, questionnaires, userQuestionnaires, userId, 0, 3, function (err, res) {
                            generateWriterQuestionnaire(writerIds, questionnaires, userQuestionnaires, certification, userId, i + 1, done);
                        });
                    }
                    else generateWriterQuestionnaire(writerIds, questionnaires, userQuestionnaires, certification, userId, i + 1, done);
                });
            }
            else generateWriterQuestionnaire(writerIds, questionnaires, userQuestionnaires, certification, userId, i + 1, done);
        });
    }
    else done(null, true);
}

var generateTVWriterQuestionnaire = function (writerIds, questionnaires, userQuestionnaires, certification, userId, i, done) {
    if (i < writerIds.length) {
        var writerId = writerIds[i];
        // get movieDB tv shows
        movieDBService.getTVShowsForWriterQuestionnaire(writerId, null, null, null, certification, 1, function (err, data) {
            if (data && data.length > 0) {
                handleTVData(data, questionnaires, userQuestionnaires, userId, 0, 2, function (err, res) {
                    generateTVWriterQuestionnaire(writerIds, questionnaires, userQuestionnaires, certification, userId, i + 1, done);
                });
            }
            else generateTVWriterQuestionnaire(writerIds, questionnaires, userQuestionnaires, certification, userId, i + 1, done);
        });
    }
    else done(null, true);
}



var generateActorQuestionnaire = function (castIds, questionnaires, userQuestionnaires, certification, userId, done) {
    if (castIds.length < 1) done(null, true);
    else {
        // get movieDB movies
        movieDBService.getMoviesForActorQuestionnaire(castIds, null, null, null, certification, function (err, data) {
            if (data && data.results) {
                handleData(data.results, questionnaires, userQuestionnaires, userId, 0, 1, function (err, res) {
                    done(null, true);
                });
            }
            else done(null, true);
        });
    }
}

var generateTVActorQuestionnaire = function (castIds, questionnaires, userQuestionnaires, certification, userId, done) {
    if (castIds.length < 1) done(null, true);
    else {
        // get movieDB tv shows
        movieDBService.getTVShowsForActorQuestionnaire(castIds, null, null, null, certification, function (err, data) {
            if (data && data.length > 0) {
                handleTVData(data.results, questionnaires, userQuestionnaires, userId, 0, 1, function (err, res) {
                    done(null, true);
                });
            }
            else done(null, true);
        });
    }
}

var generateCountryQuestionnaire = function (countries, questionnaires, userQuestionnaires, certification, userId, i, done) {
    if (i < countries.length) {
        var country = countries[i];
        // get movieDB movies
        movieDBService.getMoviesForCountryQuestionnaire(country, null, null, certification, function (err, data) {
            if (data && data.results) {
                handleData(data.results, questionnaires, userQuestionnaires, userId, 0, 3, function (err, res) {
                    generateCountryQuestionnaire(countries, questionnaires, userQuestionnaires, certification, userId, i + 1, done);
                });
            }
            else generateCountryQuestionnaire(countries, questionnaires, userQuestionnaires, certification, userId, i + 1, done);
        });
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
            tvQuestionnaireService.getAll(u.id, function (err, tvQuestionnaires) {
                // Get the TV shows from cache
                tvCacheService.getAllInArray(_.map(tvQuestionnaires, function (q) { return q.movieDBId; }), function (err, allTVCache) {
                    processTVQuestionnaire(tvQuestionnaires, allTVCache);
                    var movieIds = _.map(questionnaires, function (q) { return q.movieDBId; });
                    // try to retrieve the movies from the cache
                    movieCacheService.getAllInArray(movieIds, function (err, allMoviesCache) {
                        // Get all the informations we need for our questionnaires
                        processMovieQuestionnaires(questionnaires, allMoviesCache, function (err, questionnaires) {
                            // Deal with genres
                            console.log('Starting generating genres profile...');
                            var allGenres = [];
                            _.each(_.filter(questionnaires, function (q) { return !q.isSkipped }), function (q) {
                                _.each(q.movieInfo.genres, function (g) {
                                    allGenres.push({ genreId: g.id, name: g.name, score: getQuestionnaireScore(q), isSeen: q.isSeen });
                                });
                            });
                            _.each(_.filter(tvQuestionnaires, function (q) { return !q.isSkipped }), function (q) {
                                _.each(q.tvShowInfo.genres, function (g) {
                                    allGenres.push({ genreId: g.id, name: g.name, score: getQuestionnaireScore(q), isSeen: q.isSeen });
                                });
                            });
                            var moviesGrouped = _.groupBy(allGenres, 'genreId');
                            processMovieGenreGroups(moviesGrouped, u.id, function (err, res) {

                                // Deal with directors
                                console.log('Starting generating directors profile...');
                                var moviesDirectors = [];
                                _.each(_.filter(questionnaires, function (q) { return !q.isSkipped }), function (q) {
                                    var directors = movieDBService.getDirectors(q.movieCredits);
                                    _.each(directors, function (d) {
                                        moviesDirectors.push({ movieDBId: q.movieDBId, directorId: d.id, name: d.name, score: getQuestionnaireScore(q), isSeen: q.isSeen });
                                    });
                                });
                                var moviesGrouped = _.groupBy(moviesDirectors, 'directorId');
                                processMovieDirectorGroups(moviesGrouped, u.id, function (err, res) {

                                    // Deal with creators
                                    console.log('Starting generating TV creators profile...');
                                    var tvCreators = [];
                                    _.each(_.filter(tvQuestionnaires, function (q) { return !q.isSkipped }), function (q) {
                                        _.each(q.tvShowInfo.created_by, function (c) {
                                            tvCreators.push({ creatorId: c.id, name: c.name, score: getQuestionnaireScore(q), isSeen: q.isSeen });
                                        });
                                    });
                                    var moviesGrouped = _.groupBy(tvCreators, 'creatorId');
                                    processTVCreatorGroups(moviesGrouped, u.id, function (err, res) {
                                        // Deal with writers
                                        console.log('Starting generating writers profile...');
                                        var allWriters = [];
                                        _.each(_.filter(questionnaires, function (q) { return !q.isSkipped }), function (q) {
                                            var writers = movieDBService.getWriters(q.movieCredits);
                                            _.each(writers, function (w) {
                                                allWriters.push({ writerId: w.id, name: w.name, score: getQuestionnaireScore(q), isSeen: q.isSeen });
                                            });
                                        });
                                        _.each(_.filter(tvQuestionnaires, function (q) { return !q.isSkipped }), function (q) {
                                            var writers = movieDBService.getWriters(q.tvShowCredits);
                                            _.each(writers, function (w) {
                                                allWriters.push({ writerId: w.id, name: w.name, score: getQuestionnaireScore(q), isSeen: q.isSeen });
                                            });
                                        });
                                        var moviesGrouped = _.groupBy(allWriters, 'writerId');
                                        processMovieWriterGroups(moviesGrouped, u.id, function (err, res) {

                                            // Deal with actors
                                            console.log('Starting generating actors profile...');
                                            var allActors = [];
                                            _.each(_.filter(questionnaires, function (q) { return !q.isSkipped }), function (q) {
                                                var actors = movieDBService.getActors(q.movieCredits);
                                                _.each(actors, function (a) {
                                                    allActors.push({ castId: a.id, name: a.name, score: getQuestionnaireScore(q), isSeen: q.isSeen });
                                                });
                                            });
                                            _.each(_.filter(tvQuestionnaires, function (q) { return !q.isSkipped }), function (q) {
                                                var actors = movieDBService.getActors(q.tvShowCredits);
                                                _.each(actors, function (a) {
                                                    allActors.push({ castId: a.id, name: a.name, score: getQuestionnaireScore(q), isSeen: q.isSeen });
                                                });
                                            });
                                            var moviesGrouped = _.groupBy(allActors, 'castId');
                                            processMovieActorGroups(moviesGrouped, u.id, function (err, res) {

                                                // Deal with countries
                                                console.log('Starting generating countries profile...');
                                                var allCountries = [];
                                                _.each(_.filter(questionnaires, function (q) { return !q.isSkipped }), function (q) {
                                                    allCountries.push({ country: q.movieInfo.original_language, name: q.movieInfo.original_language, score: getQuestionnaireScore(q), isSeen: q.isSeen });
                                                });
                                                _.each(_.filter(tvQuestionnaires, function (q) { return !q.isSkipped }), function (q) {
                                                    allCountries.push({ country: q.tvShowInfo.original_language, name: q.tvShowInfo.original_language, score: getQuestionnaireScore(q), isSeen: q.isSeen });
                                                });
                                                var moviesGrouped = _.groupBy(allCountries, 'country');
                                                processMovieCountryGroups(moviesGrouped, u.id, function (err, res) {
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
                        });
                    });
                });
            });
        });
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

var processTVQuestionnaire = function (questionnaires, allTVCache) {
    _.each(questionnaires, function (q) {
        q.tvShowInfo = _.find(allTVCache.tvShowInfos, function (i) { return i.movieDBId == q.movieDBId });
        q.tvShowCredits = _.find(allTVCache.tvShowCredits, function (c) { return c.movieDBId == q.movieDBId });
    });
}

var processMovieCountryGroups = function (moviesGrouped, userId, done) {
    processCountryGroup(moviesGrouped, 0, userId, done);
}

var processCountryGroup = function (moviesGrouped, i, userId, done) {
    if (i < _.size(moviesGrouped)) {
        var g = moviesGrouped[Object.keys(moviesGrouped)[i]];
        var userProfile = {
            userId: userId,
            name: g[0].name,
            country: g[0].country,
            seenCount: _.size(_.filter(g, function (e) { return e.isSeen; })),
            score: (_.reduce(g, function (memo, m) { return memo + m.score; }, 0)) / (_.size(g)),
            scoreRelevance: getGenreScoreRelevance(_.size(g))
        }
        userProfileService.createOrUpdate(userProfile, function (err, res) {
            processCountryGroup(moviesGrouped, i + 1, userId, done);
        });
    }
    else done(null, true);
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
            seenCount: _.size(_.filter(g, function (e) { return e.isSeen; })),
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
            seenCount: _.size(_.filter(g, function (e) { return e.isSeen; })),
            score: (_.reduce(g, function (memo, m) { return memo + m.score; }, 0)) / (_.size(g)),
            scoreRelevance: getDirectorScoreRelevance(_.size(g))
        }
        userProfileService.createOrUpdate(userProfile, function (err, res) {
            processDirectorGroup(moviesGrouped, i + 1, userId, done);
        });
    }
    else done(null, true);
}

var processTVCreatorGroups = function (moviesGrouped, userId, done) {
    processTVCreatorGroup(moviesGrouped, 0, userId, done);
}

var processTVCreatorGroup = function (moviesGrouped, i, userId, done) {
    if (i < _.size(moviesGrouped)) {
        var g = moviesGrouped[Object.keys(moviesGrouped)[i]];
        var userProfile = {
            userId: userId,
            name: g[0].name,
            creatorId: g[0].creatorId,
            seenCount: _.size(_.filter(g, function (e) { return e.isSeen; })),
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
            seenCount: _.size(_.filter(g, function (e) { return e.isSeen; })),
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
            seenCount: _.size(_.filter(g, function (e) { return e.isSeen; })),
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