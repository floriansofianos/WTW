var models = require('../models');
var _ = require('underscore');
var request = require('request');
var parse = require('xml2js').parseString;
//var baseUrl = 'https://138-201-206-76.cf7929582f244e7a910a51b91c985abf.plex.direct:32400';
//var plexToken = 'Qw6CsHBxFfLyyP7cXBtr';
var mdb = require('moviedb')('d03322a5a892ce280f22234584618e9e');
var models = require('../models');

module.exports = function () {
    var updateAllPlexMovies = function (plexServer, done) {
        // Start by deleting all the server movies
        deleteAllPlexServerMovies(plexServer.id, function (err, result) {
            var baseUrl = plexServer.url;
            var plexToken = plexServer.token;
            // Start by getting all the plex movies
            request(baseUrl + '/library/sections/4/all?type=1&includeCollections=1&X-Plex-Token=' + plexToken, function (error, response, body) {
                if (!error) {
                    parse(body, function (err, result) {
                        var allVideos = result.MediaContainer.Video;
                        handlePlexServerMovie(allVideos, 0, function (err, result) {
                            done(err, result);
                        });
                    });
                }
            });
        });
    }

    var createPlexServerMovie = function (plexServerId, movie, done) {
        models.PlexServerMovie.create({
            plexServerId: plexServerId,
            movieDBId: movie.id
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

    var handlePlexServerMovie = function (plexServerMovies, i, done) {
        if (i < plexServerMovies.length) {
            var v = plexServerMovies[i];
            var metadataUrl = v.$.key;
            request(baseUrl + metadataUrl + '?X-Plex-Token=' + plexToken, function (error, response, body) {
                parse(body, function (err, result) {
                    var imdbId = result.MediaContainer.Video[0].guid.replace('com.plexapp.agents.imdb://', '').split('?')[0];
                    mdb.find({ id: imdbId }, (err, data) => {
                        if (err) return done(err, null);
                        else createPlexServerMovie(plexServer.id, data, function (err, data) {
                            // Handle next movie
                            handlePlexServerMovie(plexServerMovies, i + 1, done);
                        });
                    });
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

    
    return {
        updateAllPlexMovies: updateAllPlexMovies
    }
}