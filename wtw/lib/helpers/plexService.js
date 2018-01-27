var models = require('../models');
var _ = require('underscore');
var request = require('request');
var parse = require('xml2js').parseString;
var mdb = require('moviedb')('d03322a5a892ce280f22234584618e9e');
var models = require('../models');
var moment = require('moment');

module.exports = function () {
    var updateAllPlexMovies = function (plexServer, done) {
        // Check if we need the update
        models.PlexServerMovie.findOne({ where: { plexServerId: plexServer.id } }).then(plexServerMovie => {
            if (!plexServerMovie || moment(plexServerMovie.createdAt).add(1, 'days') < moment()) {
                // Start by deleting all the server movies
                deleteAllPlexServerMovies(plexServer.id, function (err, result) {
                    var baseUrl = plexServer.url;
                    var plexToken = plexServer.token;
                    // Start by getting all the plex movies
                    request(baseUrl + '/library/sections/4/all?type=1&includeCollections=1&X-Plex-Token=' + plexToken, function (error, response, body) {
                        if (!error) {
                            parse(body, function (err, result) {
                                var allVideos = result.MediaContainer.Video;
                                handlePlexServerMovie(baseUrl, plexToken, plexServer, allVideos, 0, function (err, result) {
                                    done(err, result);
                                });
                            });
                        }
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

    var deleteAllPlexServerMovies = function (plexServerId, done) {
        models.PlexServerMovie.destroy({ where: { plexServerId: plexServerId } }).then(result => {
            done(null, result);
        }).catch(function (err) {
            done(err);
        });
    }

    var handlePlexServerMovie = function (baseUrl, plexToken, plexServer, plexServerMovies, i, done) {
        if (i < plexServerMovies.length) {
            var v = plexServerMovies[i];
            var metadataUrl = v.$.key;
            request(baseUrl + metadataUrl + '?X-Plex-Token=' + plexToken, function (error, response, body) {
                parse(body, function (err, result) {
                    if (result.MediaContainer.Video[0].$.guid.indexOf('themoviedb://') !== -1) {
                        var movieDBId = result.MediaContainer.Video[0].$.guid.replace('com.plexapp.agents.themoviedb://', '').split('?')[0];
                        createPlexServerMovieFromMovieId(plexServer.id, movieDBId, function (err, data) {
                            // Handle next movie
                            handlePlexServerMovie(baseUrl, plexToken, plexServer, plexServerMovies, i + 1, done);
                        });
                    }
                    else {
                        var imdbId = result.MediaContainer.Video[0].$.guid.replace('com.plexapp.agents.imdb://', '').split('?')[0];
                        mdb.find({ id: imdbId, external_source: 'imdb_id' }, (err, data) => {

                            if (err) return done(err, null);
                            else {
                                if (data.movie_results[0]) {
                                    createPlexServerMovie(plexServer.id, data.movie_results[0], function (err, data) {
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
    
    return {
        updateAllPlexMovies: updateAllPlexMovies,
        getAllPlexServers: getAllPlexServers,
        isAvailableOnPlex: isAvailableOnPlex
    }
}