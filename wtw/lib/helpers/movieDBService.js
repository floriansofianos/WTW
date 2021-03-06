﻿var library = require('../helpers/library')();
var movieDBRequestHelper = require('../helpers/movieDBRequestHelper')();
var mdbHelper = require('../helpers/mdbHelper')();
var cache = require('memory-cache');
var date = require('date-and-time');
var _ = require('underscore');
var models = require('../models');
var moment = require('moment');
var sequelize = require('Sequelize');

module.exports = function () {
    var getFirstTenMovies = function (lang, movieQuestionnaires, certification, yearOfBirth, language, done) {
        var query = JSON.parse(JSON.stringify(firstTenQuery));
        if (certification) {
            query['certification_country'] = 'US';
            query['certification.lte'] = certification;
        }
        if (yearOfBirth) {
            query['release_date.gte'] = yearOfBirth + '-01-01';
        }
        if (language) {
            query['with_original_language'] = language;
        }
        movieDBRequestHelper.makeRequest('discoverMovie', language ? library.randomInt(1, 15) : library.randomInt(1, 36), query, (err, data) => {
            if (err) return done(err, null);
            data.results = _.filter(data.results, function (r) { return _.find(movieQuestionnaires, function (q) { return q.movieDBId == r.id }) == undefined; });
            var movieId = data.results[library.randomInt(0, data.results.length)].id;
            if (movieId) {
                getMovieWithAdditionalInfo(movieId, lang, (err, data) => {
                    if (err) return done(err, null);
                    else return done(null, data);
                });
            }
            else return done(null, { success: false });
        });
    };

    var getPopularMovies = function (minRelease, maxRelease, language, certification, done) {
        var query = JSON.parse(JSON.stringify(firstTenQuery));
        if (minRelease || maxRelease) {
            if (maxRelease) {
                query['release_date.lte'] = maxRelease + '-12-31';
            }
            if (minRelease) {
                query['release_date.gte'] = minRelease + '-01-01';
            }
        }
        if (certification) {
            query['certification_country'] = 'US';
            query['certification.lte'] = certification;
        }
        if (language) {
            query['with_original_language'] = language;
        }
        movieDBRequestHelper.makeRequest('discoverMovie', library.randomInt(1, 25), query, (err, data) => {
            if (err) return done(err, null);
            else return done(null, data);
        });
    };

    var getPopularTVShows = function (minRelease, maxRelease, language, certification, done) {
        var query = JSON.parse(JSON.stringify(firstTenQueryTV));
        if (minRelease || maxRelease) {
            if (maxRelease) {
                query['first_air_date.lte'] = maxRelease + '-12-31';
            }
            if (minRelease) {
                query['first_air_date.gte'] = minRelease + '-01-01';
            }
        }
        if (certification) {
            query['certification_country'] = 'US';
            query['certification.lte'] = certification;
        }
        if (language) {
            query['with_original_language'] = language;
        }
        movieDBRequestHelper.makeRequest('discoverTv', library.randomInt(1, 25), query, (err, data) => {
            if (err) return done(err, null);
            else return done(null, data);
        });
    };

    var getSimilarMovies = function (movieId, done) {
        mdbHelper.makeMovieDBRequest('movieSimilar', { id: movieId }, (err, data) => {
            if (err) return done(err, null);
            else return done(null, data);
        });
    };

    var getSimilarTVShows = function (movieId, done) {
        mdbHelper.makeMovieDBRequest('tvSimilar', { id: movieId }, (err, data) => {
            if (err) return done(err, null);
            else return done(null, data);
        });
    };

    var getRatingCertification = function (yearOfBirth) {
        if (!yearOfBirth) return null;
        var age = new Date().getFullYear() - yearOfBirth;
        if (age < 12) return 'G';
        if (age < 14) return 'PG-13';
        if (age < 16) return 'R';
        if (age < 18) return 'NC-17';
        else return null;
    }

    var wtw = function (id, country, lang, genreId, useWatchlist, nowPlaying, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, certification, languageSelected, otherUserId, usePlexServer, plexServerId, movieQuestionnaireService, movieCacheService, userProfileService, movieRecommandationService, movieDBService, done) {
        movieQuestionnaireService.getAll(otherUserId, function (err, res) {
            if (err) return done(err);
            var alreadyAnsweredMovieIds = _.map(_.filter(res, function (r) { return r.isSeen || (!r.wantToSee && !r.isSkipped) }), 'movieDBId');
            var otherUserLovedMovieIds = _.map(_.filter(res, function (r) { return r.isSeen && r.rating == 5; }), 'movieDBId');
            movieQuestionnaireService.getAll(id, function (err, res) {
                if (err) return done(err);
                alreadyAnsweredMovieIds = alreadyAnsweredMovieIds.concat(_.map(_.filter(res, function (r) { return r.isSeen || (!r.wantToSee && !r.isSkipped) }), 'movieDBId'));
                var lovedMovieIds = _.map(_.filter(res, function (r) { return r.isSeen && r.rating == 5; }), 'movieDBId');
                if (otherUserId) {
                    // We need to only consider movies that both users love
                    lovedMovieIds = _.filter(lovedMovieIds, function (id) { return _.find(otherUserLovedMovieIds, function (m) { return m == id; }) != undefined });
                }
                if (nowPlaying) {
                    // Only consider movies now playing in theaters
                    getNowPlayingMovies(country, lang, genreId, useRuntimeLimit, runtimeLimit, languageSelected, alreadyAnsweredMovieIds, movieCacheService, function (err, data) {
                        if (err) return done(err);
                        if (_.size(data) < 1) return done(null, false);
                        else {
                            // we need to calculate the score of each movie and then choose the best choice
                            getScores(id, otherUserId, data, movieRecommandationService, userProfileService, movieDBService, 0, function (err, data) {
                                if (err) return done(err);
                                var filteredData = _.filter(data, function (d) { return d.wtwScore.score > 50 });
                                if (_.size(filteredData) < 1) return done(null, _.sample(data));
                                else {
                                    var highestCertainty = _.sortBy(filteredData, function (d) { return d.wtwScore.certaintyLevel; })[0].wtwScore.certaintyLevel;
                                    return done(null, _.max(_.filter(filteredData, function (d) { return d.wtwScore.certaintyLevel == highestCertainty }), function (d) { return d.wtwScore.score; }))
                                }

                            });
                        }
                    });
                }
                else if (usePlexServer && plexServerId) {
                    // Only consider movies in plex server
                    getAllPlexMovies(plexServerId, minRelease, maxRelease, lang, genreId, useRuntimeLimit, runtimeLimit, languageSelected, alreadyAnsweredMovieIds, movieCacheService, function (err, data) {
                        if (err) return done(err);
                        if (_.size(data) < 1) return done(null, false);
                        else {
                            // we need to calculate the score of each movie and then choose the best choice
                            getScores(id, otherUserId, data, movieRecommandationService, userProfileService, movieDBService, 0, function (err, data) {
                                if (err) return done(err);
                                var filteredData = _.filter(data, function (d) { return d.wtwScore.score > 50 });
                                if (_.size(filteredData) < 1) return done(null, _.sample(data));
                                else {
                                    var topScores = _.first(_.sortBy(filteredData, function (d) { return d.wtwScore.score; }).reverse(), Math.min(100, filteredData.length));
                                    return done(null, _.sample(topScores))
                                }

                            });
                        }
                    });
                }
                else if (useWatchlist) {
                    movieQuestionnaireService.getWatchlist(otherUserId, function (err, watchlist) {
                        if (err) return done(err);
                        var otherUserWatchlist = _.map(watchlist, 'movieDBId');
                        movieQuestionnaireService.getWatchlist(id, function (err, watchlist) {
                            if (err) return done(err);
                            var movieDBIds = _.map(watchlist, 'movieDBId');
                            if (otherUserId) {
                                // Filter the watchlists to only get the movies in common
                                movieDBIds = _.filter(movieDBIds, function (id) { return _.find(otherUserWatchlist, function (o) { return o == id }) != undefined; });
                            }
                            movieCacheService.getAllInArrayWithLang(movieDBIds, lang, function (err, data) {
                                if (err) return done(err);
                                data = _.map(data, 'data');
                                // Get rid of duplicates
                                data = _.map(_.groupBy(data, 'id'), function (g) {
                                    return g[0];
                                });
                                data = filterMoviesForWTW(data, genreId, useRuntimeLimit, runtimeLimit, alreadyAnsweredMovieIds, minRelease, maxRelease, languageSelected);
                                if (_.size(data) > 0) done(null, _.sample(data));
                                else return findMovieWithoutWishlist(id, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, certification, languageSelected, alreadyAnsweredMovieIds, otherUserId, movieCacheService, userProfileService, movieRecommandationService, lovedMovieIds, done);
                            });
                        });
                    });
                }
                else return findMovieWithoutWishlist(id, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, certification, languageSelected, alreadyAnsweredMovieIds, otherUserId, movieCacheService, userProfileService, movieRecommandationService, lovedMovieIds, done);
            });
        });
    }

    var wtwTV = function (id, country, lang, genreId, useWatchlist, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, certification, languageSelected, otherUserId, usePlexServer, plexServerId, tvQuestionnaireService, tvCacheService, userProfileService, tvRecommandationService, movieDBService, done) {
        tvQuestionnaireService.getAll(otherUserId, function (err, res) {
            if (err) return done(err);
            var alreadyAnsweredMovieIds = _.map(_.filter(res, function (r) { return r.isSeen || (!r.wantToSee && !r.isSkipped) }), 'movieDBId');
            var otherUserLovedMovieIds = _.map(_.filter(res, function (r) { return r.isSeen && r.rating == 5; }), 'movieDBId');
            tvQuestionnaireService.getAll(id, function (err, res) {
                if (err) return done(err);
                alreadyAnsweredMovieIds = alreadyAnsweredMovieIds.concat(_.map(_.filter(res, function (r) { return r.isSeen || (!r.wantToSee && !r.isSkipped) }), 'movieDBId'));
                var lovedMovieIds = _.map(_.filter(res, function (r) { return r.isSeen && r.rating == 5; }), 'movieDBId');
                if (otherUserId) {
                    // We need to only consider tv shows that both users love
                    lovedMovieIds = _.filter(lovedMovieIds, function (id) { return _.find(otherUserLovedMovieIds, function (m) { return m == id; }) != undefined });
                }
                if (usePlexServer && plexServerId) {
                    // Only consider tv shows in plex server
                    getAllPlexTVShows(plexServerId, minRelease, maxRelease, lang, genreId, useRuntimeLimit, runtimeLimit, languageSelected, alreadyAnsweredMovieIds, tvCacheService, function (err, data) {
                        if (err) return done(err);
                        if (_.size(data) < 1) return done(null, false);
                        else {
                            // we need to calculate the score of each tv show and then choose the best choice
                            getTVScores(id, otherUserId, data, tvRecommandationService, userProfileService, tvCacheService, 0, function (err, data) {
                                if (err) return done(err);
                                var filteredData = _.filter(data, function (d) { return d.wtwScore.score > 50 });
                                if (_.size(filteredData) < 1) return done(null, _.sample(data));
                                else {
                                    var topScores = _.first(_.sortBy(filteredData, function (d) { return d.wtwScore.score; }).reverse(), Math.min(100, filteredData.length));
                                    return done(null, _.sample(topScores))
                                }
                            });
                        }
                    });
                }
                else if (useWatchlist) {
                    tvQuestionnaireService.getWatchlist(otherUserId, function (err, watchlist) {
                        if (err) return done(err);
                        var otherUserWatchlist = _.map(watchlist, 'movieDBId');
                        tvQuestionnaireService.getWatchlist(id, function (err, watchlist) {
                            if (err) return done(err);
                            var movieDBIds = _.map(watchlist, 'movieDBId');
                            if (otherUserId) {
                                // Filter the watchlists to only get the movies in common
                                movieDBIds = _.filter(movieDBIds, function (id) { return _.find(otherUserWatchlist, function (o) { return o == id }) != undefined; });
                            }
                            tvCacheService.getAllInArrayWithLang(movieDBIds, lang, function (err, data) {
                                if (err) return done(err);
                                data = _.map(data, 'data');
                                // Get rid of duplicates
                                data = _.map(_.groupBy(data, 'id'), function (g) {
                                    return g[0];
                                });
                                data = filterTVShowsForWTW(data, genreId, useRuntimeLimit, runtimeLimit, alreadyAnsweredMovieIds, minRelease, maxRelease, languageSelected);
                                if (_.size(data) > 0) done(null, _.sample(data));
                                else return findTVShowWithoutWishlist(id, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, certification, languageSelected, alreadyAnsweredMovieIds, otherUserId, tvCacheService, userProfileService, tvRecommandationService, lovedMovieIds, done);
                            });
                        });
                    });
                }
                else return findTVShowWithoutWishlist(id, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, certification, languageSelected, alreadyAnsweredMovieIds, otherUserId, tvCacheService, userProfileService, tvRecommandationService, lovedMovieIds, done);
            });
        });
    }

    var getNowPlayingMovies = function (country, lang, genreId, useRuntimeLimit, runtimeLimit, language, alreadyAnsweredMovieIds, movieCacheService, done) {
        var query = JSON.parse(JSON.stringify(firstTenQuery));
        // Check MovieDB: the release dates for movies in other regions are very unreliable. Now Playing for Australia gives a very limited amount of results
        //TODO: contact MovieDB see if they have the reason why the release dates are so crap and now playing is not useable for Australia
        if (country == 'US' || country == 'FR') {
            query.region = country
        }
        query.language = lang;
        query['release_date.lte'] = moment().format("YYYY-MM-DD");
        query['release_date.gte'] = moment().add(-20, 'days').format("YYYY-MM-DD");

        if (language) {
            query['with_original_language'] = language;
        }

        mdbHelper.makeMovieDBRequest('discoverMovie', query, (err, data) => {
            if (err) return done(err, null);
            else {
                getAllMovies(_.map(data.results, 'id'), lang, movieCacheService, function (err, data) {
                    if (err) return done(err);
                    data = filterMoviesForWTW(data, genreId, useRuntimeLimit, runtimeLimit, alreadyAnsweredMovieIds, null, null, null);
                    done(null, data);
                });
            }
        });
    }

    var getAllPlexMovies = function (plexServerId, minRelease, maxRelease, lang, genreId, useRuntimeLimit, runtimeLimit, language, alreadyAnsweredMovieIds, movieCacheService, done) {
        models.PlexServerMovie.findAll({ where: { plexServerId: plexServerId } }).then(results => {
            getAllMovies(_.map(results, 'movieDBId'), lang, movieCacheService, function (err, data) {
                if (err) return done(err);
                data = filterMoviesForWTW(data, genreId, useRuntimeLimit, runtimeLimit, alreadyAnsweredMovieIds, minRelease, maxRelease, language);
                done(null, data);
            });
        }).catch(function (err) {
            done(err);
        });
    }

    var getAllPlexTVShows = function (plexServerId, minRelease, maxRelease, lang, genreId, useRuntimeLimit, runtimeLimit, language, alreadyAnsweredMovieIds, tvCacheService, done) {
        models.PlexServerTVShow.findAll({ where: { plexServerId: plexServerId } }).then(results => {
            getAllTVShows(_.map(results, 'movieDBId'), lang, tvCacheService, function (err, data) {
                if (err) return done(err);
                data = filterTVShowsForWTW(data, genreId, useRuntimeLimit, runtimeLimit, alreadyAnsweredMovieIds, minRelease, maxRelease, language);
                done(null, data);
            });
        }).catch(function (err) {
            done(err);
        });
    }

    var getScores = function (userId, otherUserId, data, movieRecommandationService, userProfileService, movieDBService, i, done) {
        if (i < data.length) {
            var d = data[i];
            movieRecommandationService.getScoreForUsers(userId, otherUserId, d.id, userProfileService, movieDBService, function (err, res) {
                if (err) return done(err);
                d.wtwScore = res;
                getScores(userId, otherUserId, data, movieRecommandationService, userProfileService, movieDBService, i + 1, done);
            });
        }
        else done(null, data);
    }

    var getTVScores = function (userId, otherUserId, data, tvRecommandationService, userProfileService, movieDBService, i, done) {
        if (i < data.length) {
            var d = data[i];
            tvRecommandationService.getScoreForUsers(userId, otherUserId, d.id, userProfileService, movieDBService, function (err, res) {
                if (err) return done(err);
                d.wtwScore = res;
                getScores(userId, otherUserId, data, tvRecommandationService, userProfileService, movieDBService, i + 1, done);
            });
        }
        else done(null, data);
    }

    var filterMoviesForWTW = function (data, genreId, useRuntimeLimit, runtimeLimit, alreadyAnsweredMovieIds, minRelease, maxRelease, language) {
        if (minRelease && maxRelease) data = _.filter(data, function (d) { return (new Date(d.release_date).getFullYear() >= minRelease) && (new Date(d.release_date).getFullYear() <= maxRelease) });
        if (genreId) data = _.filter(data, function (m) { return _.find(m.genres, function (g) { return g.id == genreId }) });
        if (useRuntimeLimit) data = _.filter(data, function (m) { return m.runtime <= runtimeLimit });
        if (language) data = _.filter(data, function (m) { return m.original_language == language });
        // filter out videos, movies that are not out yet, movies that are too short
        data = _.filter(data, function (m) { return !m.video && m.runtime > 60 && new Date(m.release_date) <= new Date(); })
        return _.filter(data, function (d) { return !_.contains(alreadyAnsweredMovieIds, d.id) });
    }

    var filterTVShowsForWTW = function (data, genreId, useRuntimeLimit, runtimeLimit, alreadyAnsweredMovieIds, minRelease, maxRelease, language) {
        if (minRelease && maxRelease) data = _.filter(data, function (d) { return (new Date(d.first_air_date).getFullYear() >= minRelease) && (new Date(d.first_air_date).getFullYear() <= maxRelease) });
        if (genreId) data = _.filter(data, function (m) { return _.find(m.genres, function (g) { return g.id == genreId }) });
        if (useRuntimeLimit) data = _.filter(data, function (m) { return Math.min(m.episode_run_time) <= runtimeLimit });
        if (language) data = _.filter(data, function (m) { return m.original_language == language });
        return _.filter(data, function (d) { return !_.contains(alreadyAnsweredMovieIds, d.id) });
    }

    var findMovieWithoutWishlist = function (id, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, certification, language, alreadyAnsweredMovieIds, otherUserId, movieCacheService, userProfileService, movieRecommandationService, lovedMovieIds, done) {
        // Start by looking at the reco
        movieRecommandationService.getAll(id, function (err, recos) {
            if (err) return done(err);
            var movieDBIds = _.map(recos, 'movieDBId');
            movieRecommandationService.getAll(otherUserId, function (err, recos) {
                if (err) return done(err);
                if (recos.length > 0) {
                    // Only get the recos 
                    movieDBIds = _.filter(movieDBIds, function (id) { return _.find(recos, function (r) { return r.movieDBId == id }) != undefined });
                }
                movieCacheService.getAllInArrayWithLang(movieDBIds, lang, function (err, data) {
                    if (err) return done(err);
                    data = _.map(data, 'data');
                    // Get rid of duplicates
                    data = _.map(_.groupBy(data, 'id'), function (g) {
                        return g[0];
                    });
                    data = filterMoviesForWTW(data, genreId, useRuntimeLimit, runtimeLimit, alreadyAnsweredMovieIds, minRelease, maxRelease, language);
                    if (_.size(data) > 0) return done(null, _.sample(data));
                    // maybe some of the movies were not in the cache
                    var notFoundMovieIds = _.filter(movieDBIds, function (id) { return !_.find(data, function (d) { return d.id == id }) });
                    findMovieRelevantForWTW(notFoundMovieIds, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, 0, function (err, res) {
                        if (err) return done(err);
                        if (res) return done(null, res);
                        else {
                            // Nothing? then try one of our favourite director - go more than 1 page in movieDB discover
                            // First get all profiles
                            userProfileService.getAll(id, function (err, profiles) {
                                if (err) return done(err);
                                // Add profiles of other user
                                userProfileService.getAll(otherUserId, function (err, otherUserProfiles) {
                                    if (err) return done(err);
                                    if (otherUserId) {
                                        // If we watch with friend, calculate a common profile between the 2 users
                                        var relevantOtherUserProfiles = _.filter(otherUserProfiles, function (oup) {
                                            return (oup.genreId && _.find(profiles, function (p) { return p.genreId == oup.genreId }) != undefined) ||
                                                (oup.castId && _.find(profiles, function (p) { return p.castId == oup.castId }) != undefined) ||
                                                (oup.writerId && _.find(profiles, function (p) { return p.writerId == oup.writerId }) != undefined) ||
                                                (oup.directorId && _.find(profiles, function (p) { return p.directorId == oup.directorId }) != undefined) ||
                                                (oup.country && _.find(profiles, function (p) { return p.country == oup.country }) != undefined)
                                        });
                                        var recalculatedProfiles = [];
                                        _.each(relevantOtherUserProfiles, function (oup) {
                                            // Find the user profile
                                            var userProfile = _.find(profiles, function (p) {
                                                return (oup.genreId && p.genreId == oup.genreId) || (oup.castId && p.castId == oup.castId) || (oup.writerId && p.writerId == oup.writerId)
                                                    || (oup.directorId && p.directorId == oup.directorId) || (oup.country && p.country == oup.country);
                                            });
                                            recalculatedProfiles.push({
                                                genreId: oup.genreId,
                                                castId: oup.castId,
                                                writerId: oup.writerId,
                                                directorId: oup.directorId,
                                                country: oup.country,
                                                score: (oup.score + userProfile.score) / 2,
                                                scoreRelevance: (oup.scoreRelevance + userProfile.scoreRelevance) / 2,
                                                seenCount: (oup.seenCount + userProfile.seenCount) / 2
                                            })
                                        });
                                        profiles = recalculatedProfiles;
                                    }
                                    findDirectorWTWMovie(profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, function (err, res) {
                                        if (err) return done(err);
                                        if (res) return done(null, res);
                                        else {
                                            // Nothing? try writer - go more than 1 page in movieDB discover
                                            findWriterWTWMovie(profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, function (err, res) {
                                                if (err) return done(err);
                                                if (res) return done(null, res);
                                                else {
                                                    // Nothing? what about favourite genre if not provided
                                                    findGenreWTWMovie(profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, function (err, res) {
                                                        if (err) return done(err);
                                                        if (res) return done(null, res);
                                                        else {
                                                            // Nothing? what about favourite actor
                                                            findActorWTWMovie(profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, function (err, res) {
                                                                if (err) return done(err);
                                                                if (res) return done(null, res);
                                                                else {
                                                                    // Nothing? what about favourite actor
                                                                    findCountryWTWMovie(profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, function (err, res) {
                                                                        if (err) return done(err);
                                                                        if (res) return done(null, res);
                                                                        else {
                                                                            // Nothing? Try find similar movies to loved movie
                                                                            findSimilarWTWMovie(profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, lovedMovieIds, function (err, res) {
                                                                                if (err) return done(err);
                                                                                if (res) return done(null, res);
                                                                                else {
                                                                                    // Nothing? Try popular movie
                                                                                    findPopularWTWMovie(profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, function (err, res) {
                                                                                        if (err) return done(err);
                                                                                        if (res) return done(null, res);
                                                                                        else {
                                                                                            // Nothing? Give up!
                                                                                            return done(null, false);
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    });

                                });
                            });
                        }
                    })
                });
            });
        });
    }

    var findTVShowWithoutWishlist = function (id, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, certification, language, alreadyAnsweredMovieIds, otherUserId, tvCacheService, userProfileService, tvRecommandationService, lovedMovieIds, done) {
        // Start by looking at the reco
        tvRecommandationService.getAll(id, function (err, recos) {
            if (err) return done(err);
            var movieDBIds = _.map(recos, 'movieDBId');
            tvRecommandationService.getAll(otherUserId, function (err, recos) {
                if (err) return done(err);
                if (recos.length > 0) {
                    // Only get the recos 
                    movieDBIds = _.filter(movieDBIds, function (id) { return _.find(recos, function (r) { return r.movieDBId == id }) != undefined });
                }
                tvCacheService.getAllInArrayWithLang(movieDBIds, lang, function (err, data) {
                    if (err) return done(err);
                    data = _.map(data, 'data');
                    // Get rid of duplicates
                    data = _.map(_.groupBy(data, 'id'), function (g) {
                        return g[0];
                    });
                    data = filterTVShowsForWTW(data, genreId, useRuntimeLimit, runtimeLimit, alreadyAnsweredMovieIds, minRelease, maxRelease, language);
                    if (_.size(data) > 0) return done(null, _.sample(data));
                    // Nothing? then try one of our favourite tv creator
                    // First get all profiles
                    userProfileService.getAll(id, function (err, profiles) {
                        if (err) return done(err);
                        // Add profiles of other user
                        userProfileService.getAll(otherUserId, function (err, otherUserProfiles) {
                            if (err) return done(err);
                            if (otherUserId) {
                                // If we watch with friend, calculate a common profile between the 2 users
                                var relevantOtherUserProfiles = _.filter(otherUserProfiles, function (oup) {
                                    return (oup.genreId && _.find(profiles, function (p) { return p.genreId == oup.genreId }) != undefined) ||
                                        (oup.castId && _.find(profiles, function (p) { return p.castId == oup.castId }) != undefined) ||
                                        (oup.writerId && _.find(profiles, function (p) { return p.writerId == oup.writerId }) != undefined) ||
                                        (oup.creatorId && _.find(profiles, function (p) { return p.creatorId == oup.creatorId }) != undefined) ||
                                        (oup.country && _.find(profiles, function (p) { return p.country == oup.country }) != undefined)
                                });
                                var recalculatedProfiles = [];
                                _.each(relevantOtherUserProfiles, function (oup) {
                                    // Find the user profile
                                    var userProfile = _.find(profiles, function (p) {
                                        return (oup.genreId && p.genreId == oup.genreId) || (oup.castId && p.castId == oup.castId) || (oup.writerId && p.writerId == oup.writerId)
                                            || (oup.creatorId && p.creatorId == oup.creatorId) || (oup.country && p.country == oup.country);
                                    });
                                    recalculatedProfiles.push({
                                        genreId: oup.genreId,
                                        castId: oup.castId,
                                        writerId: oup.writerId,
                                        creatorId: oup.creatorId,
                                        country: oup.country,
                                        score: (oup.score + userProfile.score) / 2,
                                        scoreRelevance: (oup.scoreRelevance + userProfile.scoreRelevance) / 2,
                                        seenCount: (oup.seenCount + userProfile.seenCount) / 2
                                    })
                                });
                                profiles = recalculatedProfiles;
                            }
                            findCreatorWTWTVShow(profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, function (err, res) {
                                if (err) return done(err);
                                if (res) return done(null, res);
                                else {
                                    // Nothing? try writer
                                    findWriterWTWTVShow(profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, tvCacheService, function (err, res) {
                                        if (err) return done(err);
                                        if (res) return done(null, res);
                                        else {
                                            // Nothing? what about favourite genre if not provided
                                            findGenreWTWTVShow(profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, function (err, res) {
                                                if (err) return done(err);
                                                if (res) return done(null, res);
                                                else {
                                                    // Nothing? what about favourite actor
                                                    findActorWTWTVShow(profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, tvCacheService, function (err, res) {
                                                        if (err) return done(err);
                                                        if (res) return done(null, res);
                                                        else {
                                                            // Nothing? what about favourite country
                                                            findCountryWTWTVShow(profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, function (err, res) {
                                                                if (err) return done(err);
                                                                if (res) return done(null, res);
                                                                else {
                                                                    // Nothing? Try find similar movies to loved movie
                                                                    findSimilarWTWTVShow(profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, lovedMovieIds, tvCacheService, function (err, res) {
                                                                        if (err) return done(err);
                                                                        if (res) return done(null, res);
                                                                        else {
                                                                            // Nothing? Try popular movie
                                                                            findPopularWTWTVShow(profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, tvCacheService, function (err, res) {
                                                                                if (err) return done(err);
                                                                                if (res) return done(null, res);
                                                                                else {
                                                                                    // Nothing? Give up!
                                                                                    return done(null, false);
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            })
                                        }
                                    })
                                }
                            });

                        });
                    });
                });
            });
        });
    }

    var findDirectorWTWMovie = function (profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, done) {
        var favouriteDirector = _.sample(_.filter(profiles, function (p) { return p.scoreRelevance > 60 && p.score > 60 && p.directorId }));
        if (favouriteDirector) {
            return findDirectorWTWMovieOnPage(profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, favouriteDirector.directorId, 1, done)
        }
        else done(null, false);
    }

    var findDirectorWTWMovieOnPage = function (profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, directorId, page, done) {
        getMoviesForDirectorQuestionnaire(directorId, minRelease, maxRelease, language, certification, page, alreadyAnsweredMovieIds.length, function (err, data) {
            if (err) return done(err);
            if (data && data.results) {
                var max_page = data.total_pages;
                filterOutDirectorData(directorId, data, 0, function (err, res) {
                    if (err) return done(err);
                    data = res;
                    if (data.results.length > 0) {
                        return findMovieRelevantForWTW(_.map(data.results, 'id'), lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, 0, done)
                    }
                    else {
                        // Go to next page only if we can
                        if (page < 5 && page <= max_page) return findDirectorWTWMovieOnPage(profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, directorId, page + 1, done);
                        else return done(null, false);
                    };
                });
            }
            else return done(null, false);
        });
    }

    var filterOutDirectorData = function (directorId, data, i, done) {
        if (i < data.results.length) {
            var d = data.results[i];
            isMovieDirector(d.id, directorId, function (err, res) {
                if (err) return done(err);
                if (!res) {
                    data.results = _.without(data.results, d);
                    filterOutDirectorData(directorId, data, i, done);
                }
                else filterOutDirectorData(directorId, data, i + 1, done);
            });
        }
        else done(null, data);
    }

    var findCreatorWTWTVShow = function (profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, done) {
        var favouriteCreator = _.sample(_.filter(profiles, function (p) { return p.scoreRelevance > 60 && p.score > 60 && p.creatorId }));
        if (favouriteCreator) {
            getTVShowsForCreatorQuestionnaire(favouriteCreator.creatorId, function (err, tvShows) {
                if (err) return done(err);
                if (tvShows.length > 0) {
                    return findTVShowRelevantForWTW(tvShows, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, 0, done)
                }
                else done(null, false);
            });
        }
        else done(null, false);
    }

    var getTVShowsForCreatorQuestionnaire = function (creatorId, done) {
        models.sequelize.query("SELECT * FROM \"TVShowInfoCaches\" WHERE \"lang\" = 'en' and data->'created_by' @> '[{\"id\":" + creatorId + "}]'", { type: sequelize.QueryTypes.SELECT })
            .then(tvShowInfos => {
                return done(null, tvShowInfos);
            })
            .catch(function (err) {
                done(err);
            });
    }

    var findWriterWTWTVShow = function (profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, tvCacheService, done) {
        var favouriteWriter = _.sample(_.filter(profiles, function (p) { return p.scoreRelevance > 60 && p.score > 60 && p.writerId }));
        if (favouriteWriter) {
            getTVShowsForWriterQuestionnaire(favouriteWriter.writerId, tvCacheService, function (err, data) {
                if (err) done(err);
                else {
                    return findTVShowRelevantForWTW(data, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, 0, done)
                }
            });
        }
        else done(null, false);
    }

    var getTVShowsForWriterQuestionnaire = function (writerId, tvCacheService, done) {
        models.sequelize.query("SELECT * FROM \"TVShowCreditsCaches\" WHERE data->'crew' @> '[{\"id\":" + writerId + "}]'", { type: sequelize.QueryTypes.SELECT })
            .then(tvShowCredits => {
                if (tvShowCredits.length > 0) {
                    var movieDBIds = _.map(tvShowCredits, 'movieDBId');
                    tvCacheService.getAllInArrayWithLang(movieDBIds, 'en', function (err, data) {
                        if (err) done(err);
                        else {
                            done(null, data);
                        }
                    });
                }
                else done(null, false);
            })
            .catch(function (err) {
                done(err);
            });
    } 

    var findWriterWTWMovie = function (profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, done) {
        var favouriteWriter = _.sample(_.filter(profiles, function (p) { return p.scoreRelevance > 60 && p.score > 60 && p.writerId }));
        if (favouriteWriter) {
            return findWriterWTWMovieOnPage(profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, favouriteWriter.writerId, 1, done)
        }
        else done(null, false);
    }

    var findWriterWTWMovieOnPage = function (profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, writerId, page, done) {
        getMoviesForWriterQuestionnaire(writerId, minRelease, maxRelease, language, certification, page, alreadyAnsweredMovieIds.length, function (err, data) {
            if (err) return done(err);
            if (data && data.results) {
                var max_page = data.total_pages;
                filterOutWriterData(writerId, data, 0, function (err, res) {
                    if (err) return done(err);
                    data = res;
                    if (data.results.length > 0) {
                        return findMovieRelevantForWTW(_.map(data.results, 'id'), lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, 0, done)
                    }
                    else {
                        // Go to next page
                        if (page < 5 && page <= max_page) return findWriterWTWMovieOnPage(profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, writerId, page + 1, done);
                        else return done(null, false);
                    };
                });
            }
            else return done(null, false);
        });
    }

    var filterOutWriterData = function (writerId, data, i, done) {
        if (i < data.results.length) {
            var d = data.results[i];
            isMovieWriter(d.id, writerId, function (err, res) {
                if (err) return done(err);
                if (!res) {
                    data.results = _.without(data.results, d);
                    filterOutWriterData(writerId, data, i, done);
                }
                else filterOutWriterData(writerId, data, i + 1, done);
            });
        }
        else done(null, data);
    }

    var findGenreWTWMovie = function (profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, done) {
        // We can't do anything if the genre is already provided
        if (genreId) return done(null, false);
        var filteredProfiles = _.filter(profiles, function (p) { return p.scoreRelevance > 60 && p.genreId });
        var seenCountForGenres = _.reduce(filteredProfiles, function (memo, p) { return memo + p.seenCount; }, 0);
        var numberOfGenres = _.size(filteredProfiles);
        var seenCountAverage = numberOfGenres == 0 ? 0 : (seenCountForGenres / numberOfGenres);
        var favouriteGenre = _.sample(_.filter(filteredProfiles, function (p) { return (p.score > 80 || ((p.seenCount - seenCountAverage) > (seenCountAverage / 2) && p.score > 40)); }));
        if (favouriteGenre) {
            getMoviesForGenreQuestionnaire(favouriteGenre.genreId, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds.length, function (err, data) {
                if (err) return done(err);
                if (data && data.results) {
                    if (data.results.length > 0) {
                        return findMovieRelevantForWTW(_.map(data.results, 'id'), lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, 0, done)
                    }
                    else return done(null, false);
                }
                else return done(null, false);
            });
        }
        else done(null, false);
    }

    var findGenreWTWTVShow = function (profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, done) {
        // We can't do anything if the genre is already provided
        if (genreId) return done(null, false);
        var filteredProfiles = _.filter(profiles, function (p) { return p.scoreRelevance > 60 && p.genreId });
        var seenCountForGenres = _.reduce(filteredProfiles, function (memo, p) { return memo + p.seenCount; }, 0);
        var numberOfGenres = _.size(filteredProfiles);
        var seenCountAverage = numberOfGenres == 0 ? 0 : (seenCountForGenres / numberOfGenres);
        var favouriteGenre = _.sample(_.filter(filteredProfiles, function (p) { return (p.score > 80 || ((p.seenCount - seenCountAverage) > (seenCountAverage / 2) && p.score > 40)); }));
        if (favouriteGenre) {
            getTVShowsForGenreQuestionnaire(favouriteGenre.genreId, minRelease, maxRelease, language, certification, function (err, data) {
                if (err) return done(err);
                if (data && data.length > 0) {
                    return findTVShowRelevantForWTW(data, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, 0, done)
                }
                else return done(null, false);
            });
        }
        else done(null, false);
    }

    var findCountryWTWMovie = function (profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, done) {
        // We can't do anything if the country is already provided
        if (language) return done(null, false);
        var favouriteCountry = _.sample(_.filter(profiles, function (p) { return ((p.scoreRelevance > 60 && p.score > 60) || (p.seenCount > 10 && p.country != 'en')) && p.country }));
        if (favouriteCountry) {
            getMoviesForCountryQuestionnaire(favouriteCountry.country, minRelease, maxRelease, certification, alreadyAnsweredMovieIds.length, function (err, data) {
                if (err) return done(err);
                if (data && data.results) {
                    if (data.results.length > 0) {
                        return findMovieRelevantForWTW(_.map(data.results, 'id'), lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, 0, done)
                    }
                    else return done(null, false);
                }
                else return done(null, false);
            });
        }
        else done(null, false);
    }

    var findCountryWTWTVShow = function (profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, done) {
        // We can't do anything if the country is already provided
        if (language) return done(null, false);
        var favouriteCountry = _.sample(_.filter(profiles, function (p) { return ((p.scoreRelevance > 60 && p.score > 60) || (p.seenCount > 10 && p.country != 'en')) && p.country }));
        if (favouriteCountry) {
            getTVShowsForCountryQuestionnaire(favouriteCountry.country, minRelease, maxRelease, certification, function (err, data) {
                if (err) return done(err);
                if (data && data.length > 0) {
                    return findTVShowRelevantForWTW(data, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, 0, done)
                }
                else return done(null, false);
            });
        }
        else done(null, false);
    }

    var findActorWTWMovie = function (profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, done) {
        var favouriteActor = _.sample(_.filter(profiles, function (p) { return p.scoreRelevance > 60 && p.score > 80 && p.castId }));
        if (favouriteActor) {
            getMoviesForActorQuestionnaire(favouriteActor.castId, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds.length, function (err, data) {
                if (err) return done(err);
                if (data && data.results) {
                    if (data.results.length > 0) {
                        return findMovieRelevantForWTW(_.map(data.results, 'id'), lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, 0, done)
                    }
                    else return done(null, false);
                }
                else return done(null, false);
            });
        }
        else done(null, false);
    }

    var findActorWTWTVShow = function (profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, tvCacheService, done) {
        var favouriteActor = _.sample(_.filter(profiles, function (p) { return p.scoreRelevance > 60 && p.score > 80 && p.castId }));
        if (favouriteActor) {
            getTVShowsForActorQuestionnaire(favouriteActor.castId, minRelease, maxRelease, language, certification, tvCacheService, function (err, data) {
                if (err) return done(err);
                if (data && data.length > 0) {
                    var movieDBIds = _.map(data, 'movieDBId');
                    tvCacheService.getAllInArrayWithLang(movieDBIds, 'en', function (err, data) {
                        if (err) done(err);
                        else {
                            return findTVShowRelevantForWTW(data, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, 0, done)
                        }
                    });
                }
                else done(null, false);
            });
        }
        else done(null, false);
    }

    var findPopularWTWMovie = function (profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, done) {
        getPopularMovies(minRelease, maxRelease, language, certification, function (err, data) {
            if (err) return done(err);
            if (data && data.results) {
                if (data.results.length > 0) {
                    return findMovieRelevantForWTW(_.map(data.results, 'id'), lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, 0, done)
                }
                else return done(null, false);
            }
            else return done(null, false);
        });
    }

    var findPopularWTWTVShow = function (profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, certification, alreadyAnsweredMovieIds, tvCacheService, done) {
        getPopularTVShows(minRelease, maxRelease, language, certification, function (err, data) {
            if (err) return done(err);
            if (data.results && data.results.length > 0) {
                var movieDBIds = _.map(data.results, 'id');
                tvCacheService.getAllInArrayWithLang(movieDBIds, 'en', function (err, data) {
                    if (err) done(err);
                    else {
                        return findTVShowRelevantForWTW(data, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, 0, done)
                    }
                });
            }
            else done(null, false);
        });
    }

    var findSimilarWTWMovie = function (profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, lovedMovieIds, done) {
        var movieId = _.sample(lovedMovieIds);
        getSimilarMovies(movieId, function (err, data) {
            if (err) return done(err);
            if (data && data.results) {
                if (data.results.length > 0) {
                    return findMovieRelevantForWTW(_.map(data.results, 'id'), lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, 0, done)
                }
                else return done(null, false);
            }
            else return done(null, false);
        });
    }

    var findSimilarWTWTVShow = function (profiles, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, lovedMovieIds, tvCacheService, done) {
        var movieId = _.sample(lovedMovieIds);
        getSimilarTVShows(movieId, function (err, data) {
            if (err) return done(err);
            if (data && data.results) {
                if (data.results.length > 0) {
                    var movieDBIds = _.map(data.results, 'id');
                    tvCacheService.getAllInArrayWithLang(movieDBIds, 'en', function (err, data) {
                        if (err) done(err);
                        else {
                            return findTVShowRelevantForWTW(data, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, 0, done)
                        }
                    });
                }
                else return done(null, false);
            }
            else return done(null, false);
        });
    }

    var findMovieRelevantForWTW = function (movieIds, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, i, done) {
        if (i < movieIds.length) {
            var id = movieIds[i];
            if (_.contains(alreadyAnsweredMovieIds, id)) {
                return findMovieRelevantForWTW(movieIds, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, i + 1, done);
            }
            else {
                getMovie(id, lang, function (err, m) {
                    if (err) return done(err);
                    if (!(new Date(m.release_date).getFullYear() >= minRelease) || !(new Date(m.release_date).getFullYear() <= maxRelease)) {
                        return findMovieRelevantForWTW(movieIds, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, i + 1, done);
                    }
                    if (genreId) {
                        if (!_.find(m.genres, function (g) { return g.id == genreId })) {
                            return findMovieRelevantForWTW(movieIds, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, i + 1, done);
                        }
                    }
                    if (useRuntimeLimit) {
                        if (m.runtime > runtimeLimit) {
                            return findMovieRelevantForWTW(movieIds, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, i + 1, done);
                        }
                    }
                    if (language) {
                        if (m.original_language != language) {
                            return findMovieRelevantForWTW(movieIds, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, i + 1, done);
                        }
                    }
                    return done(null, m);
                });
            }
        }
        else done(null, false);
    }

    var findTVShowRelevantForWTW = function (tvShows, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, i, done) {
        if (i < tvShows.length) {
            var tvShow = tvShows[i].data;

            if (tvShow.vote_count < getVoteCountLimit(alreadyAnsweredMovieIds.length)) {
                return findTVShowRelevantForWTW(tvShows, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, i + 1, done);
            }

            if (_.contains(alreadyAnsweredMovieIds, tvShow.id)) {
                return findTVShowRelevantForWTW(tvShows, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, i + 1, done);
            }
            else {
                if (!(new Date(tvShow.first_air_date).getFullYear() >= minRelease) || !(new Date(tvShow.first_air_date).getFullYear() <= maxRelease)) {
                    return findTVShowRelevantForWTW(tvShows, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, i + 1, done);
                }
                if (genreId) {
                    if (!_.find(tvShow.genres, function (g) { return g.id == genreId })) {
                        return findTVShowRelevantForWTW(tvShows, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, i + 1, done);
                    }
                }
                if (useRuntimeLimit) {
                    if (Math.min(tvShow.episode_run_time) > runtimeLimit) {
                        return findTVShowRelevantForWTW(tvShows, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, i + 1, done);
                    }
                }
                if (language) {
                    if (tvShow.original_language != language) {
                        return findTVShowRelevantForWTW(tvShows, lang, genreId, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, language, alreadyAnsweredMovieIds, i + 1, done);
                    }
                }
                return done(null, tvShow);
            }
        }
        else done(null, false);
    }

    var getAllMovies = function (movieIds, lang, movieCacheService, done) {
        if (movieIds.constructor !== Array) movieIds = [movieIds];
        movieCacheService.getAllInArrayWithLang(movieIds, lang, function (err, data) {
            if (err) return done(err);
            data = _.map(data, 'data');
            // Get rid of duplicates
            data = _.map(_.groupBy(data, 'id'), function (g) {
                return g[0];
            });
            var missingMovieIds = _.filter(movieIds, function (id) { return !_.find(data, function (d) { return d.id == id }); });
            if (missingMovieIds && missingMovieIds.length > 0) {
                getMoviesFromMovieDB(missingMovieIds, lang, 0, [], function (err, res) {
                    if (err) return done(err, null);
                    else {
                        data = data.concat(res);
                        done(null, data);
                    }
                });
            }
            else done(null, data);
        });
    }

    var getAllTVShows = function (movieIds, lang, tvCacheService, done) {
        if (movieIds.constructor !== Array) movieIds = [movieIds];
        tvCacheService.getAllInArrayWithLang(movieIds, lang, function (err, data) {
            if (err) return done(err);
            data = _.map(data, 'data');
            // Get rid of duplicates
            data = _.map(_.groupBy(data, 'id'), function (g) {
                return g[0];
            });
            done(null, data);
        });
    }

    var getMoviesFromMovieDB = function (movieIds, lang, i, data, done) {
        if (i < movieIds.length) {
            getMovieFromMovieDB(movieIds[i], lang, null, (err, movie) => {
                if (err) return done(err, null);
                else {
                    data.push(movie);
                    getMoviesFromMovieDB(movieIds, lang, i + 1, data, done);
                }
            });
        }
        else done(null, data);
    }

    var getMoviesForGenreQuestionnaire = function (genreId, minRelease, maxRelease, language, certification, numberOfQuestionnaires, done) {
        var query = JSON.parse(JSON.stringify(questionnaireQuery));
        query.with_genres = genreId;
        if (minRelease || maxRelease) {
            if (maxRelease) {
                query['release_date.lte'] = maxRelease + '-12-31';
            }
            if (minRelease) {
                query['release_date.gte'] = minRelease + '-01-01';
            }
        }
        if (certification) {
            query['certification_country'] = 'US';
            query['certification.lte'] = certification;
        }
        if (language) {
            query['with_original_language'] = language;
        }
        query['with_runtime.gte'] = 70;
        if (numberOfQuestionnaires) {
            query['vote_count.gte'] = getVoteCountLimit(numberOfQuestionnaires);
        }
        movieDBRequestHelper.makeRequest('discoverMovie', library.randomInt(1, 20), query, (err, data) => {
            if (err) return done(err, null);
            else {
                return done(null, data);
            }
        });
    }

    var getVoteCountLimit = function (numberOfQuestionnaires) {
        if (numberOfQuestionnaires < 100) {
            return 2000;
        }
        else if (numberOfQuestionnaires < 200) {
            return 1000;
        }
        else if (numberOfQuestionnaires < 300) {
            return 500
        }
        else if (numberOfQuestionnaires < 600) {
            return 100
        }
        else if (numberOfQuestionnaires < 2000) {
            return 25;
        }
        return 0;
    }

    var getTVShowsForGenreQuestionnaire = function (genreId, minRelease, maxRelease, language, certification, done) {
        models.sequelize.query("SELECT * FROM \"TVShowInfoCaches\" WHERE \"lang\" = 'en' and data->'genres' @> '[{\"id\":"+genreId+"}]'", { type: sequelize.QueryTypes.SELECT })
            .then(tvShowInfos => {
                return done(null, tvShowInfos);
            })
            .catch(function (err) {
                done(err);
            });
    }

    var getTVShowsForCountryQuestionnaire = function (country, minRelease, maxRelease, certification, done) {
        models.TVShowInfoCache.findAll({ where: { lang: 'en', data: { original_language: country } } }).then(tvShowInfos => {
            return done(null, tvShowInfos);
        })
            .catch(function (err) {
                done(err);
            });
    }

    var getTVShowsForActorQuestionnaire = function (castId, minRelease, maxRelease, language, certification, tvCacheService, done) {
        models.sequelize.query("SELECT * FROM \"TVShowCreditsCaches\" WHERE data->'cast' @> '[{\"id\":" + castId + "}]'", { type: sequelize.QueryTypes.SELECT })
            .then(tvShowCredits => {
                if (tvShowCredits.length > 0) {
                    var movieDBIds = _.map(tvShowCredits, 'movieDBId');
                    tvCacheService.getAllInArrayWithLang(movieDBIds, 'en', function (err, data) {
                        if (err) done(err);
                        else {
                            return done(null, data)
                        }
                    });
                }
                else done(null, false);
            })
            .catch(function (err) {
                done(err);
            });
    }

    var getMoviesForCountryQuestionnaire = function (country, minRelease, maxRelease, certification, numberOfQuestionnaires, done) {
        var query = JSON.parse(JSON.stringify(questionnaireQuery));
        query.with_original_language = country;
        if (minRelease || maxRelease) {
            if (maxRelease) {
                query['release_date.lte'] = maxRelease + '-12-31';
            }
            if (minRelease) {
                query['release_date.gte'] = minRelease + '-01-01';
            }
        }
        if (certification) {
            query['certification_country'] = 'US';
            query['certification.lte'] = certification;
        }
        query['with_runtime.gte'] = 70;
        if (numberOfQuestionnaires) {
            query['vote_count.gte'] = getVoteCountLimit(numberOfQuestionnaires);
        }
        movieDBRequestHelper.makeRequest('discoverMovie', library.randomInt(1, 5), query, (err, data) => {
            if (err) return done(err, null);
            else {
                return done(null, data);
            }
        });
    }

    var getMoviesForDirectorQuestionnaire = function (directorId, minRelease, maxRelease, language, certification, page, numberOfQuestionnaires, done) {
        var query = JSON.parse(JSON.stringify(questionnaireQuery));
        query.with_crew = directorId;
        query.page = page;
        if (minRelease || maxRelease) {
            if (maxRelease) {
                query['release_date.lte'] = maxRelease + '-12-31';
            }
            if (minRelease) {
                query['release_date.gte'] = minRelease + '-01-01';
            }
        }
        if (certification) {
            query['certification_country'] = 'US';
            query['certification.lte'] = certification;
        }
        if (language) {
            query['with_original_language'] = language;
        }
        if (numberOfQuestionnaires) {
            query['vote_count.gte'] = getVoteCountLimit(numberOfQuestionnaires);
        }
        query['with_runtime.gte'] = 70;
        mdbHelper.makeMovieDBRequest('discoverMovie', query, (err, data) => {
            if (err) return done(err, null);
            else {
                return done(null, data);
            }
        });
    }

    var getMoviesForWriterQuestionnaire = function (writerId, minRelease, maxRelease, language, certification, page, numberOfQuestionnaires, done) {
        var query = JSON.parse(JSON.stringify(questionnaireQuery));
        query.with_crew = writerId;
        query.page = page;
        if (minRelease || maxRelease) {
            if (maxRelease) {
                query['release_date.lte'] = maxRelease + '-12-31';
            }
            if (minRelease) {
                query['release_date.gte'] = minRelease + '-01-01';
            }
        }
        if (certification) {
            query['certification_country'] = 'US';
            query['certification.lte'] = certification;
        }
        if (language) {
            query['with_original_language'] = language;
        }
        if (numberOfQuestionnaires) {
            query['vote_count.gte'] = getVoteCountLimit(numberOfQuestionnaires);
        }
        query['with_runtime.gte'] = 70;
        mdbHelper.makeMovieDBRequest('discoverMovie', query, (err, data) => {
            if (err) return done(err, null);
            else {
                return done(null, data);
            }
        });
    }

    var getMoviesForActorQuestionnaire = function (castIds, minRelease, maxRelease, language, certification, numberOfQuestionnaires, done) {
        var query = JSON.parse(JSON.stringify(questionnaireQuery));
        var allCastIds = _.reduce(castIds, function (memo, c) { memo + (memo == '' ? '' : ',') + c });
        query.with_cast = allCastIds;
        if (minRelease || maxRelease) {
            if (maxRelease) {
                query['release_date.lte'] = maxRelease + '-12-31';
            }
            if (minRelease) {
                query['release_date.gte'] = minRelease + '-01-01';
            }
        }
        if (certification) {
            query['certification_country'] = 'US';
            query['certification.lte'] = certification;
        }
        if (language) {
            query['with_original_language'] = language;
        }
        if (numberOfQuestionnaires) {
            query['vote_count.gte'] = getVoteCountLimit(numberOfQuestionnaires);
        }
        query['with_runtime.gte'] = 70;
        mdbHelper.makeMovieDBRequest('discoverMovie', query, (err, data) => {
            if (err) return done(err, null);
            else {
                return done(null, data);
            }
        });
    }

    var getMovieWithAdditionalInfo = function (id, lang, done) {
        getMovie(id, lang, (err, data) => {
            if (err) return done(err, null);
            // Retrieve the trailer if available
            var movie = data;
            getMovieTrailer(id, (err, data) => {
                if (!err) {
                    movie.trailers = data.results;
                    // Retrieve the cast if available
                    getMovieCredits(id, (err, data) => {
                        if (!err) {
                            movie.actors = getActors(data);
                            movie.directors = getDirectors(data);
                            movie.writers = getWriters(data);
                        }
                        return done(null, movie);
                    });
                }
                else return done(null, movie);
            });
        });
    }

    /// Gets a movie from Cache or movieDB if not cached
    var getMovie = function (id, lang, done) {
        getMovieFromCache(id, lang, (err, movie) => {
            if (err) return done(err);
            if (movie) {
                if (date.addYears(movie.updatedAt, 3) > new Date()) return done(null, movie.data);
                else {
                    getMovieFromMovieDB(id, lang, movie, (err, movie) => {
                        if (err) return done(err, null);
                        else return done(null, movie);
                    });
                }
            }
            else {
                // Retrieve all the information about this movie
                getMovieFromMovieDB(id, lang, null, (err, movie) => {
                    if (err) return done(err, null);
                    else return done(null, movie);
                });
            }
        });
    }

    /// Gets a movie from movieDB and sets the cache
    var getMovieFromMovieDB = function (id, lang, movieCache, done) {
        mdbHelper.makeMovieDBRequest('movieInfo', { id: id, language: lang }, (err, data) => {
            if (err) return done(err, null);
            var movie = data;
            if (!movieCache) {
                setMovieCache(id, lang, movie, (err, data) => {
                    if (err) return done(err, null);
                    else return done(null, movie);
                });
            }
            else {
                movieCache.data = movie;
                movieCache.save().then(function (m, err) {
                    if (err) done(err, null);
                    else return done(null, movie);
                });
            }
        });
    }

    /// Gets a tv show from movieDB and sets the cache
    var getTVShowFromMovieDB = function (id, lang, tvCache, done) {
        mdbHelper.makeMovieDBRequest('tvInfo', { id: id, language: lang }, (err, data) => {
            if (err) return done(err, null);
            var tvShow = data;
            if (!tvCache) {
                setTVShowCache(id, lang, tvShow, (err, data) => {
                    if (err) return done(err, null);
                    else return done(null, data);
                });
            }
            else {
                tvCache.data = tvShow;
                tvCache.save().then(function (m, err) {
                    if (err) done(err, null);
                    else return done(null, tvShow);
                });
            }
        });
    }

    var getMovieFromCache = function (id, lang, done) {
        models.MovieInfoCache.findOne({ where: { movieDBId: id, lang: lang } }).then(movie => {
            done(null, movie);
        })
            .catch(function (err) {
                done(err);
            });
    }

    var setMovieCache = function (id, lang, data, done) {
        models.MovieInfoCache.create({
            movieDBId: id,
            lang: lang,
            data: data
        }).then(movieCache => {
            done(null, movieCache);
        })
            .catch(function (err) {
                done(err);
            });
    }

    var setTVShowCache = function (id, lang, data, done) {
        models.TVShowInfoCache.create({
            movieDBId: id,
            lang: lang,
            data: data
        }).then(tvShowCache => {
            done(null, tvShowCache);
        })
            .catch(function (err) {
                done(err);
            });
    }

    var getMovieTrailer = function (id, done) {
        getMovieTrailersFromCache(id, (err, trailers) => {
            if (err) return done(err);
            if (trailers) {
                if (date.addYears(trailers.updatedAt, 3) > new Date()) return done(null, trailers.data);
                else {
                    getMovieTrailersFromMovieDB(id, trailers, (err, trailers) => {
                        if (err) return done(err, null);
                        else return done(null, trailers);
                    });
                }
            }
            else {
                // Retrieve all the information about this movie
                getMovieTrailersFromMovieDB(id, null, (err, trailers) => {
                    if (err) return done(err, null);
                    else return done(null, trailers);
                });
            }
        });
    }

    /// Gets trailers from movieDB and sets the cache
    var getMovieTrailersFromMovieDB = function (id, trailersCache, done) {
        mdbHelper.makeMovieDBRequest('movieVideos', { id: id }, (err, data) => {
            if (err) return done(err, null);
            var trailers = data;
            if (!trailersCache) {
                setMovieTrailersCache(id, trailers, (err, data) => {
                    if (err) return done(err, null);
                    else return done(null, trailers);
                });
            }
            else {
                trailersCache.data = trailers;
                trailersCache.save().then(function (m, err) {
                    if (err) done(err, null);
                    else return done(null, trailers);
                });
            }
        });
    }

    var getMovieTrailersFromCache = function (id, done) {
        models.MovieVideoCache.findOne({ where: { movieDBId: id } }).then(trailers => {
            done(null, trailers);
        }).catch(function (err) {
            done(err);
        });
    }

    var setMovieTrailersCache = function (id, data, done) {
        models.MovieVideoCache.create({
            movieDBId: id,
            data: data
        }).then(trailersCache => {
            done(null, trailersCache);
        }).catch(function (err) {
            done(err);
        });
    }

    var getMovieCredits = function (id, done) {
        getMovieCreditsFromCache(id, (err, credits) => {
            if (err) return done(err);
            if (credits) {
                if (date.addYears(credits.updatedAt, 3) > new Date()) return done(null, credits.data);
                else {
                    getMovieCreditsFromMovieDB(id, credits, (err, credits) => {
                        if (err) return done(err, null);
                        else return done(null, credits);
                    });
                }
            }
            else {
                // Retrieve all the information about this movie
                getMovieCreditsFromMovieDB(id, null, (err, credits) => {
                    if (err) return done(err, null);
                    else return done(null, credits);
                });
            }
        });
    }

    /// Gets trailers from movieDB and sets the cache
    var getMovieCreditsFromMovieDB = function (id, creditsCache, done) {
        mdbHelper.makeMovieDBRequest('movieCredits', { id: id }, (err, data) => {
            if (err) return done(err, null);
            var credits = data;
            if (!creditsCache) {
                setMovieCreditsCache(id, credits, (err, data) => {
                    if (err) return done(err, null);
                    else return done(null, credits);
                });
            }
            else {
                creditsCache.data = credits;
                creditsCache.save().then(function (m, err) {
                    if (err) done(err, null);
                    else return done(null, credits);
                });
            }
        });
    }

    var getMovieCreditsFromCache = function (id, done) {
        models.MovieCreditsCache.findOne({ where: { movieDBId: id } }).then(credits => {
            done(null, credits);
        }).catch(function (err) {
            done(err);
        });
    }

    var setMovieCreditsCache = function (id, data, done) {
        models.MovieCreditsCache.create({
            movieDBId: id,
            data: data
        }).then(creditsCache => {
            done(null, creditsCache);
        }).catch(function (err) {
            done(err);
        });
    }

    var getActors = function (credits) {
        return credits.cast.slice(0, Math.min(5, credits.cast.length));
    };

    var isMovieDirector = function (movieDBId, directorId, done) {
        getMovieCredits(movieDBId, function (err, data) {
            if (err) return done(err, null);
            var directors = getDirectors(data);
            done(null, _.find(directors, function (d) { return d.id == directorId; }));
        })
    }

    var isMovieWriter = function (movieDBId, writerId, done) {
        getMovieCredits(movieDBId, function (err, data) {
            if (err) return done(err, null);
            var writers = getWriters(data);
            done(null, _.find(writers, function (d) { return d.id == writerId; }));
        })
    }

    var getDirectors = function (credits) {
        return _.filter(credits.crew, function (c) { return c.job == 'Director' });
    }

    var getWriters = function (credits) {
        return _.filter(credits.crew, function (c) { return c.job == 'Writer' || c.job == 'Screenplay' });
    }

    var getCreators = function (credits) {
        return _.filter(credits.crew, function (c) { return c.job == 'Creator' || c.job == 'Executive Producer' });
    }

    var firstTenQuery = {
        'include_adult': false,
        'include_video': false,
        'sort_by': 'popularity.desc',
        'release_date': {
            'lte': new Date().getFullYear() + '-' + new Date().getMonth() + '-01',
            'gte': '1980-01-01'
        }
    }

    var firstTenQueryTV = {
        'sort_by': 'popularity.desc',
        'first_air_date': {
            'lte': new Date().getFullYear() + '-' + new Date().getMonth() + '-01',
            'gte': '1980-01-01'
        }
    }

    var questionnaireQuery = {
        'include_adult': false,
        'include_video': false,
        'sort_by': 'popularity.desc',
        'release_date': {
            'lte': new Date().getFullYear() + '-' + new Date().getMonth() + '-01'
        }
    }

    var loadConfiguration = function (done) {
        mdbHelper.makeMovieDBRequest('configuration', {}, (err, data) => {
            if (err) return done(err, null);
            else {
                cache.put('movieDBConfiguration', data);
                return done(null, data);
            }
        });
    }

    var loadGenres = function (done) {
        mdbHelper.makeMovieDBRequest('genreMovieList', {}, (err, data) => {
            if (err) return done(err, null);
            else {
                cache.put('movieDBGenres', data);
                return done(null, data);
            }
        });
    }

    var getGenres = function () {
        return cache.get('movieDBGenres').genres;
    }

    var getConfiguration = function () {
        return cache.get('movieDBConfiguration');
    }

    var getAlsoKnown = function (directorId, writerId, actorId, creatorId, lang, done) {
        getPeopleFromCache(directorId, writerId, actorId, creatorId, lang, (err, people) => {
            if (err) return done(err);
            if (people) {
                if (date.addMonths(people.updatedAt, 3) > new Date()) return done(null, people.data);
                else {
                    getPeopleFromMovieDB(directorId, writerId, actorId, creatorId, lang, people, (err, people) => {
                        if (err) return done(err, null);
                        else return done(null, people);
                    });
                }
            }
            else {
                // Retrieve all the information about this movie
                getPeopleFromMovieDB(directorId, writerId, actorId, creatorId, lang, null, (err, people) => {
                    if (err) return done(err, null);
                    else return done(null, people);
                });
            }
        });
    }

    /// Gets cast from movieDB and sets the cache
    var getPeopleFromMovieDB = function (directorId, writerId, actorId, creatorId, lang, peopleCache, done) {
        var id = directorId ? directorId : (writerId ? writerId : (actorId ? actorId : creatorId));
        mdbHelper.makeMovieDBRequest('personCombinedCredits', { id: id, lang: lang }, (err, data) => {
            if (err) return done(err, null);
            if (directorId) data = getDirectors(data);
            if (writerId) data = getWriters(data);
            if (actorId) data = getActors(data);
            if (creatorId) data = getCreators(data);
            var cast = data;
            if (!peopleCache) {
                setPeopleCache(directorId, writerId, actorId, creatorId, lang, data, (err, data) => {
                    if (err) return done(err, null);
                    else return done(null, cast);
                });
            }
            else {
                peopleCache.data = cast;
                peopleCache.save().then(function (m, err) {
                    if (err) done(err, null);
                    else return done(null, cast);
                });
            }
        });
    }

    var getPeopleFromCache = function (directorId, writerId, actorId, creatorId, lang, done) {
        models.PeopleCache.findOne({ where: { directorId: directorId, writerId: writerId, actorId: actorId, creatorId: creatorId, lang: lang } }).then(cast => {
            done(null, cast);
        }).catch(function (err) {
            done(err);
        });
    }

    var setPeopleCache = function (directorId, writerId, actorId, creatorId, lang, data, done) {
        models.PeopleCache.create({
            directorId: directorId,
            writerId: writerId,
            actorId: actorId,
            creatorId: creatorId,
            lang: lang,
            data: data
        }).then(castCache => {
            done(null, castCache);
        }).catch(function (err) {
            done(err);
        });
    }

    var search = function (s, lang, done) {
        mdbHelper.makeMovieDBRequest('searchMovie', { query: s, include_adult: false, language: lang }, (err, data) => {
            if (err) return done(err, null);
            else {
                return done(null, data);
            }
        });
    }

    var searchTV = function (s, lang, done) {
        mdbHelper.makeMovieDBRequest('searchTv', { query: s, include_adult: false, language: lang }, (err, data) => {
            if (err) return done(err, null);
            else {
                return done(null, data);
            }
        });
    }

    var retrieveAndStoreTVShows = function (done) {
        // Start by getting the total number of pages
        var query = JSON.parse(JSON.stringify({
            'sort_by': 'popularity.desc',
            'first_air_date': {
                'lte': new Date().getFullYear() + '-' + new Date().getMonth() + '-01',
                'gte': '1960-01-01'
            }
        }));
        movieDBRequestHelper.makeRequest('discoverTv', 1, query, (err, data) => {
            if (err) return done(err, null);
            else {
                var totalPages = data.total_pages;
                retrieveAndStoreTVShowsAtPage(1, totalPages, done);
            }
        });
    }

    var retrieveAndStoreTVShowsAtPage = function (page, totalPages, done) {
        if (page <= totalPages) {
            var query = JSON.parse(JSON.stringify({
                'sort_by': 'popularity.desc',
                'first_air_date': {
                    'lte': new Date().getFullYear() + '-' + new Date().getMonth() + '-01',
                    'gte': '1960-01-01'
                }
            }));
            movieDBRequestHelper.makeRequest('discoverTv', page, query, (err, data) => {
                if (err) return done(err, null);
                else {
                    var tvShows = data.results;
                    retrieveAndStoreTVShow(0, tvShows, page, totalPages, function (err, data) {
                        if (err) return done(err);
                        retrieveAndStoreTVShowsAtPage(data.page + 1, data.totalPages, done);
                    });
                }
            });
        }
        else done(null, { success: true });
    }

    var retrieveAndStoreTVShow = function (i, tvShows, page, totalPages, done) {
        if (i < tvShows.length) {
            var tvShow = tvShows[i];
            if (!tvShow) retrieveAndStoreTVShow(i + 1, tvShows, page, totalPages, done);
            else {
                models.TVShowInfoCache.findOne({ where: { movieDBId: tvShow.id } }).then(info => {
                    if (info && date.addYears(info.updatedAt, 1) > new Date()) {
                        // already in DB skip info, get credits if necessary
                        models.TVShowCreditsCache.findOne({ where: { movieDBId: tvShow.id } }).then(credits => {
                            if (!credits) {
                                getTVShowCreditsFromMovieDB(info.data, function (err, data) {
                                    if (err) return done(err);
                                    models.TVVideoCache.findOne({ where: { movieDBId: tvShow.id } }).then(videos => {
                                        if (!videos) {
                                            getTVShowVideoFromMovieDB(tvShow.id, 'en', function (err, data) {
                                                if (err) return done(err);
                                                getTVShowVideoFromMovieDB(tvShow.id, 'fr', function (err, data) {
                                                    if (err) return done(err);
                                                    retrieveAndStoreTVShow(i + 1, tvShows, page, totalPages, done);
                                                });
                                            });
                                        }
                                        else retrieveAndStoreTVShow(i + 1, tvShows, page, totalPages, done);
                                    }).catch(function (err) {
                                        done(err);
                                    });
                                });
                            }
                            else {
                                models.TVVideoCache.findOne({ where: { movieDBId: tvShow.id } }).then(videos => {
                                    if (!videos) {
                                        getTVShowVideoFromMovieDB(tvShow.id, 'en', function (err, data) {
                                            if (err) return done(err);
                                            getTVShowVideoFromMovieDB(tvShow.id, 'fr', function (err, data) {
                                                if (err) return done(err);
                                                retrieveAndStoreTVShow(i + 1, tvShows, page, totalPages, done);
                                            });
                                        });
                                    }
                                    else retrieveAndStoreTVShow(i + 1, tvShows, page, totalPages, done);
                                }).catch(function (err) {
                                    done(err);
                                });
                            }
                        }).catch(function (err) {
                            done(err);
                        });
                    }
                    else {
                        if (info) {
                            models.TVShowInfoCache.destroy({ where: { id: info.id } }).then(data => {
                                models.TVShowCreditsCache.destroy({ where: { id: info.movieDBId } }).then(data => {
                                    models.TVVideoCache.destroy({ where: { id: info.movieDBId } }).then(data => {
                                        getTVShowFromMovieDB(tvShow.id, 'en', null, function (err, data) {
                                            if (err) return done(err);
                                            getTVShowFromMovieDB(tvShow.id, 'fr', null, function (err, data) {
                                                if (err) return done(err);
                                                getTVShowCreditsFromMovieDB(data.data, function (err, data) {
                                                    if (err) return done(err);
                                                    getTVShowVideoFromMovieDB(data.movieDBId, 'en', function (err, data) {
                                                        if (err) return done(err);
                                                        getTVShowVideoFromMovieDB(data.movieDBId, 'fr', function (err, data) {
                                                            if (err) return done(err);
                                                            retrieveAndStoreTVShow(i + 1, tvShows, page, totalPages, done);
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    }).catch(function (err) {
                                        done(err);
                                    });
                                }).catch(function (err) {
                                    done(err);
                                });
                            }).catch(function (err) {
                                done(err);
                            });
                        }
                        else {
                            getTVShowFromMovieDB(tvShow.id, 'en', null, function (err, data) {
                                if (err) return done(err);
                                getTVShowFromMovieDB(tvShow.id, 'fr', null, function (err, data) {
                                    if (err) return done(err);
                                    getTVShowCreditsFromMovieDB(data.data, function (err, data) {
                                        if (err) return done(err);
                                        getTVShowVideoFromMovieDB(data.movieDBId, 'en', function (err, data) {
                                            if (err) return done(err);
                                            getTVShowVideoFromMovieDB(data.movieDBId, 'fr', function (err, data) {
                                                if (err) return done(err);
                                                retrieveAndStoreTVShow(i + 1, tvShows, page, totalPages, done);
                                            });
                                        });
                                    });
                                });
                            });
                        }
                    }
                }).catch(function (err) {
                    done(err);
                });
            }
        }
        else done(null, { page: page, totalPages: totalPages });
    }

    var getTVShowCreditsFromMovieDB = function (tvShow, done) {
        // Start with the array of seasons
        var seasons = _.map(_.filter(tvShow.seasons, function (s) { return s.season_number > 0; }), function (s) { return s.episode_count; });
        var crew = _.map(tvShow.created_by, function (c) { return { job: "Creator", id: c.id, name: c.name }; });
        mdbHelper.makeMovieDBRequest('tvCredits', { id: tvShow.id }, (err, data) => {
            if (err) return done(err, null);
            var cast = data.cast;
            // Now we need to improve the crew by searching episode by episode
            getTVShowCrewFromMovieDB(tvShow.id, seasons, crew, 0, 1, function (err, data) {
                if (err) return done(err);
                models.TVShowCreditsCache.create({
                    movieDBId: tvShow.id,
                    data: { cast: cast, crew: data }
                }).then(tvShowCache => {
                    done(null, tvShowCache);
                })
                    .catch(function (err) {
                        done(err);
                    });
            });
        });
    }

    var getTVShowVideoFromMovieDB = function(movieDBId, lang, done) {
        mdbHelper.makeMovieDBRequest('tvVideos', { id: movieDBId, language: lang }, (err, data) => {
            if (err) return done(err, null);
            models.TVVideoCache.create({
                movieDBId: movieDBId,
                data: data,
                lang: lang
            }).then(tvVideoCache => {
                done(null, tvVideoCache);
            })
                .catch(function (err) {
                    done(err);
                });
            
        });
    }

    var getTVShowCrewFromMovieDB = function (id, seasons, crew, season, episode, done) {
        if (season < seasons.length) {
            var numberOfEpisodes = seasons[season];
            if (numberOfEpisodes < episode) {
                // Change season
                getTVShowCrewFromMovieDB(id, seasons, crew, season + 1, 1, done);
            }
            else {
                mdbHelper.makeMovieDBRequest('tvEpisodeCredits', { id: id, season_number: season + 1, episode_number: episode }, (err, data) => {
                    // Sometimes the episode is missing data, just skip
                    //if (err) return done(err, null);
                    setTimeout(function () {
                        console.log("TV Show Cache: Season: " + (season + 1) + "/" + seasons.length + ", Episode: " + episode);
                        if (data) {
                            _.each(data.crew, function (c) {
                                if (c.job == 'Writer' || c.job == 'Screenplay') {
                                    var existingCrew = _.find(crew, function (p) { return p.id == c.id; });
                                    if (existingCrew) existingCrew.numberOfEpisodes++;
                                    else crew.push({ job: c.job, numberOfEpisodes: 1, name: c.name, id: c.id, profile_path: c.profile_path });
                                }
                            });
                        }
                        // Next Episode
                        getTVShowCrewFromMovieDB(id, seasons, crew, season, episode + 1, done);
                    }, 500);
                });
            }
        }
        else done(null, crew);
    }

    return {
        getFirstTenMovies: getFirstTenMovies,
        loadConfiguration: loadConfiguration,
        getConfiguration: getConfiguration,
        loadGenres: loadGenres,
        getGenres: getGenres,
        getMovieWithAdditionalInfo: getMovieWithAdditionalInfo,
        getAlsoKnown: getAlsoKnown,
        search: search,
        searchTV: searchTV,
        getMovie: getMovie,
        getMovieCredits: getMovieCredits,
        getDirectors: getDirectors,
        getWriters: getWriters,
        getActors: getActors,
        getMoviesForGenreQuestionnaire: getMoviesForGenreQuestionnaire,
        getTVShowsForGenreQuestionnaire: getTVShowsForGenreQuestionnaire,
        getMoviesForDirectorQuestionnaire: getMoviesForDirectorQuestionnaire,
        getTVShowsForCreatorQuestionnaire: getTVShowsForCreatorQuestionnaire,
        getMoviesForWriterQuestionnaire: getMoviesForWriterQuestionnaire,
        getTVShowsForWriterQuestionnaire: getTVShowsForWriterQuestionnaire,
        getMoviesForActorQuestionnaire: getMoviesForActorQuestionnaire,
        getTVShowsForActorQuestionnaire: getTVShowsForActorQuestionnaire,
        getMoviesForCountryQuestionnaire: getMoviesForCountryQuestionnaire,
        getTVShowsForCountryQuestionnaire: getTVShowsForCountryQuestionnaire,
        getAllMovies: getAllMovies,
        getAllTVShows: getAllTVShows,
        isMovieDirector: isMovieDirector,
        isMovieWriter: isMovieWriter,
        wtw: wtw,
        wtwTV: wtwTV,
        filterOutDirectorData: filterOutDirectorData,
        filterOutWriterData: filterOutWriterData,
        getSimilarMovies: getSimilarMovies,
        getSimilarTVShows: getSimilarTVShows,
        getRatingCertification: getRatingCertification,
        retrieveAndStoreTVShows: retrieveAndStoreTVShows
    }
}