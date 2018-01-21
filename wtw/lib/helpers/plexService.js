var models = require('../models');
var _ = require('underscore');
var request = require('request');
var parse = require('xml2js').parseString;
var baseUrl = 'https://138-201-206-76.cf7929582f244e7a910a51b91c985abf.plex.direct:32400';
var plexToken = 'Qw6CsHBxFfLyyP7cXBtr'

module.exports = function () {
    var updateAllPlexMovies = function () {
        // Start by getting all the plex movies
        request(baseUrl + '/library/sections/4/all?type=1&includeCollections=1&X-Plex-Token=' + plexToken, function (error, response, body) {
            if (!error) {
                parse(body, function (err, result) {
                    var allVideos = result.MediaContainer.Video;
                    _.each(allVideos, function (v) {
                        var metadataUrl = v.$.key;
                        request(baseUrl + metadataUrl + '?X-Plex-Token=' + plexToken, function (error, response, body) {
                            parse(body, function (err, result) {
                                var teteet = result;
                            });
                        });
                    });
                });
            }
        });
    }

    
    return {
        updateAllPlexMovies: updateAllPlexMovies
    }
}