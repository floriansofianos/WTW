var models = require('../models');
var _ = require('underscore');
var request = require('request');
var parse = require('xml2js').parseString;
var mdbHelper = require('../helpers/mdbHelper')();
var models = require('../models');
var moment = require('moment');

module.exports = function () {
    var updateAllPlexMovies = function (plexServer, done) {
        // Check if we need the update
        models.PlexServerMovie.findOne({ where: { plexServerId: plexServer.id } }).then(plexServerMovie => {
            if (!plexServerMovie || moment(plexServerMovie.createdAt).add(1, 'days') < moment()) {
                // Start by deleting all the server movies
                deleteAllPlexServerMovies(plexServer.id, function (err, result) {
                    if (err) return done(err);
                    var baseUrl = plexServer.url;
                    var plexToken = plexServer.token;
                    // Start by getting all the plex movies
                    request({ url: baseUrl + '/library/sections/4/all?type=1&includeCollections=1&X-Plex-Token=' + plexToken, rejectUnauthorized: false }, function (error, response, body) {
                        if (!error) {
                            parse(body, function (err, result) {
                                if (err) return done(err);
                                var allVideos = result.MediaContainer.Video;
                                handlePlexServerMovie(baseUrl, plexToken, plexServer, allVideos, 0, function (err, result) {
                                    done(err, result);
                                });
                            });
                        }
                        else return done(error);
                    });
                });
            }
            else {
                // Nothing to do
                done(null, true);
            }
        }).catch(function (err) {
            done(err);
        });
    }

    var updateAllPlexTVShows = function (plexServer, done) {
        // Check if we need the update
        models.PlexServerTVShow.findOne({ where: { plexServerId: plexServer.id } }).then(plexServerTVShow => {
            if (!plexServerTVShow || moment(plexServerTVShow.createdAt).add(1, 'days') < moment()) {
                // Start by deleting all the server tv shows
                deleteAllPlexServerTVShows(plexServer.id, function (err, result) {
                    if (err) return done(err);
                    var baseUrl = plexServer.url;
                    var plexToken = plexServer.token;
                    // Start by getting all the plex movies
                    request({ url: baseUrl + '/library/sections/3/all?type=2&includeCollections=1&X-Plex-Token=' + plexToken, rejectUnauthorized: false }, function (error, response, body) {
                        if (!error) {
                            parse(body, function (err, result) {
                                if (err) return done(err);
                                var allVideos = result.MediaContainer.Directory;
                                handlePlexServerTVShow(baseUrl, plexToken, plexServer, allVideos, 0, function (err, result) {
                                    done(err, result);
                                });
                            });
                        }
                        else return done(error);
                    });
                });
            }
            else {
                // Nothing to do
                done(null, true);
            }
        }).catch(function (err) {
            done(err);
        });
    }

    var createPlexServerMovie = function (plexServerId, movie, done) {
        createPlexServerMovieFromMovieId(plexServerId, movie.id, done);
    }

    var createPlexServerMovieFromMovieId = function (plexServerId, movieId, done) {
        models.PlexServerMovie.create({
            plexServerId: plexServerId,
            movieDBId: movieId
        }).then(plexServerMovie => {
            done(null, plexServerMovie);
        }).catch(function (err) {
            done(err);
        });
    }

    var createPlexServerTVShow = function (plexServerId, tvShow, done) {
        createPlexServerTVShowFromMovieId(plexServerId, tvShow.id, done);
    }

    var createPlexServerTVShowFromMovieId = function (plexServerId, movieId, done) {
        models.PlexServerTVShow.create({
            plexServerId: plexServerId,
            movieDBId: movieId
        }).then(plexServerTVShow => {
            done(null, plexServerTVShow);
        }).catch(function (err) {
            done(err);
        });
    }

    var deleteAllPlexServerMovies = function (plexServerId, done) {
        models.PlexServerMovie.destroy({ where: { plexServerId: plexServerId } }).then(result => {
            done(null, result);
        }).catch(function (err) {
            done(err);
        });
    }

    var deleteAllPlexServerTVShows = function (plexServerId, done) {
        models.PlexServerTVShow.destroy({ where: { plexServerId: plexServerId } }).then(result => {
            done(null, result);
        }).catch(function (err) {
            done(err);
        });
    }

    var handlePlexServerMovie = function (baseUrl, plexToken, plexServer, plexServerMovies, i, done) {
        if (i < plexServerMovies.length) {
            var v = plexServerMovies[i];
            var metadataUrl = v.$.key;
            request({ url: baseUrl + metadataUrl + '?X-Plex-Token=' + plexToken, rejectUnauthorized: false }, function (error, response, body) {
                if (error) return done(error);
                parse(body, function (err, result) {
                    if (err) return done(err);
                    if (result.MediaContainer.Video[0].$.guid.indexOf('themoviedb://') !== -1) {
                        var movieDBId = result.MediaContainer.Video[0].$.guid.replace('com.plexapp.agents.themoviedb://', '').split('?')[0];
                        createPlexServerMovieFromMovieId(plexServer.id, movieDBId, function (err, data) {
                            if (err) return done(err);
                            // Handle next movie
                            handlePlexServerMovie(baseUrl, plexToken, plexServer, plexServerMovies, i + 1, done);
                        });
                    }
                    else {
                        var imdbId = result.MediaContainer.Video[0].$.guid.replace('com.plexapp.agents.imdb://', '').split('?')[0];
                        mdbHelper.makeMovieDBRequest('find', { id: imdbId, external_source: 'imdb_id' }, (err, data) => {

                            if (err) return done(err, null);
                            else {
                                if (data.movie_results[0]) {
                                    createPlexServerMovie(plexServer.id, data.movie_results[0], function (err, data) {
                                        if (err) return done(err);
                                        // Handle next movie
                                        handlePlexServerMovie(baseUrl, plexToken, plexServer, plexServerMovies, i + 1, done);
                                    });
                                }
                                else {
                                    // Handle next movie
                                    handlePlexServerMovie(baseUrl, plexToken, plexServer, plexServerMovies, i + 1, done);
                                }
                            }
                        });
                    }
                });
            });
        }
        else done(null, plexServerMovies);
    }

    var handlePlexServerTVShow = function (baseUrl, plexToken, plexServer, plexServerTVShows, i, done) {
        if (i < plexServerTVShows.length) {
            var v = plexServerTVShows[i];
            var metadataUrl = v.$.key.replace('/children', '');
            request({ url: baseUrl + metadataUrl + '?X-Plex-Token=' + plexToken, rejectUnauthorized: false }, function (error, response, body) {
                if (error) return done(error);
                parse(body, function (err, result) {
                    if (err) return done(err);
                    if (result.MediaContainer.Directory[0].$.guid.indexOf('themoviedb://') !== -1) {
                        var movieDBId = result.MediaContainer.Directory[0].$.guid.replace('com.plexapp.agents.themoviedb://', '').split('?')[0];
                        createPlexServerTVShowFromMovieId(plexServer.id, movieDBId, function (err, data) {
                            if (err) return done(err);
                            // Handle next movie
                            handlePlexServerTVShow(baseUrl, plexToken, plexServer, plexServerTVShows, i + 1, done);
                        });
                    }
                    else {
                        var theTVDBId = result.MediaContainer.Directory[0].$.guid.replace('com.plexapp.agents.thetvdb://', '').split('?')[0];
                        mdbHelper.makeMovieDBRequest('find', { id: theTVDBId, external_source: 'tvdb_id' }, (err, data) => {

                            if (err) return done(err, null);
                            else {
                                if (data.tv_results[0]) {
                                    createPlexServerTVShow(plexServer.id, data.tv_results[0], function (err, data) {
                                        if (err) return done(err);
                                        // Handle next movie
                                        handlePlexServerTVShow(baseUrl, plexToken, plexServer, plexServerTVShows, i + 1, done);
                                    });
                                }
                                else {
                                    // Handle next movie
                                    handlePlexServerTVShow(baseUrl, plexToken, plexServer, plexServerTVShows, i + 1, done);
                                }
                            }
                        });
                    }
                });
            });
        }
        else done(null, plexServerTVShows);
    }

    var getAllPlexServers = function (done) {
        models.PlexServer.findAll().then(result => {
            done(null, result);
        }).catch(function (err) {
            done(err);
        });
    }

    var isAvailableOnPlex = function (movieDBId, plexServerId, done) {
        models.PlexServerMovie.findOne({ where: { plexServerId: plexServerId, movieDBId: movieDBId } }).then(movie => {
            done(null, movie != undefined);
        })
            .catch(function (err) {
                done(err);
            });
    }

    var isTVAvailableOnPlex = function (movieDBId, plexServerId, done) {
        models.PlexServerTVShow.findOne({ where: { plexServerId: plexServerId, movieDBId: movieDBId } }).then(movie => {
            done(null, movie != undefined);
        })
            .catch(function (err) {
                done(err);
            });
    }

    return {
        updateAllPlexMovies: updateAllPlexMovies,
        updateAllPlexTVShows: updateAllPlexTVShows,
        getAllPlexServers: getAllPlexServers,
        isAvailableOnPlex: isAvailableOnPlex,
        isTVAvailableOnPlex: isTVAvailableOnPlex
    }
}