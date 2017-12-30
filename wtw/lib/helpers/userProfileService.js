var models = require('../models');
var _ = require('underscore');

var userProfileService = function() {

    var getAll = function (userId, done) {
        if (!userId) return done(null, []);
        models.UserProfile.findAll({ where: { userId: userId } }).then(data => {
            done(null, data);
        }).catch(function(err) {
            done(err);
        });
    }

    var hasEnoughProfiles = function (userId, done) {
        if (!userId) return done(true);
        models.UserProfile.findAll({ where: { userId: userId } }).then(data => {
            if (_.filter(data, function (d) { return d.scoreRelevance > 75 }).length > 10) done(null, { enoughProfiles: true });
            else done(null, { enoughProfiles: false });
        }).catch(function (err) {
            done(err);
        });
    }

    var createOrUpdate = function(userProfile, done) {
        if (userProfile.genreId) {
            models.UserProfile.findOne({ where: { userId: userProfile.userId, genreId: userProfile.genreId } }).then(data => {
                if (data) {
                    data.score = userProfile.score;
                    data.scoreRelevance = userProfile.scoreRelevance;
                    data.seenCount = userProfile.seenCount;
                    data.save().then(profile => {
                        done(null, profile);
                    }).catch(function(err) {
                        done(err);
                    });
                }
                else {
                    models.UserProfile.create({
                        userId: userProfile.userId,
                        genreId: userProfile.genreId,
                        name: userProfile.name,
                        score: userProfile.score,
                        scoreRelevance: userProfile.scoreRelevance,
                        seenCount: userProfile.seenCount
                    }).then(profile => {
                        done(null, profile);
                    }).catch(function(err) {
                        done(err);
                    });
                }
            }).catch(function(err) {
                done(err);
            });
        }
        else if (userProfile.castId) {
            models.UserProfile.findOne({ where: { userId: userProfile.userId, castId: userProfile.castId } }).then(data => {
                if (data) {
                    data.score = userProfile.score;
                    data.scoreRelevance = userProfile.scoreRelevance;
                    data.seenCount = userProfile.seenCount;
                    data.save().then(profile => {
                        done(null, profile);
                    }).catch(function(err) {
                        done(err);
                    });
                }
                else {
                    models.UserProfile.create({
                        userId: userProfile.userId,
                        castId: userProfile.castId,
                        name: userProfile.name,
                        score: userProfile.score,
                        scoreRelevance: userProfile.scoreRelevance,
                        seenCount: userProfile.seenCount
                    }).then(profile => {
                        done(null, profile);
                    }).catch(function(err) {
                        done(err);
                    });
                }
            }).catch(function(err) {
                done(err);
            });
        }
        else if (userProfile.writerId) {
            models.UserProfile.findOne({ where: { userId: userProfile.userId, writerId: userProfile.writerId } }).then(data => {
                if (data) {
                    data.score = userProfile.score;
                    data.scoreRelevance = userProfile.scoreRelevance;
                    data.seenCount = userProfile.seenCount;
                    data.save().then(profile => {
                        done(null, profile);
                    }).catch(function(err) {
                        done(err);
                    });
                }
                else {
                    models.UserProfile.create({
                        userId: userProfile.userId,
                        writerId: userProfile.writerId,
                        name: userProfile.name,
                        score: userProfile.score,
                        scoreRelevance: userProfile.scoreRelevance,
                        seenCount: userProfile.seenCount
                    }).then(profile => {
                        done(null, profile);
                    }).catch(function(err) {
                        done(err);
                    });
                }
            }).catch(function(err) {
                done(err);
            });
        }
        else if (userProfile.directorId) {
            models.UserProfile.findOne({ where: { userId: userProfile.userId, directorId: userProfile.directorId } }).then(data => {
                if (data) {
                    data.score = userProfile.score;
                    data.scoreRelevance = userProfile.scoreRelevance;
                    data.seenCount = userProfile.seenCount;
                    data.save().then(profile => {
                        done(null, profile);
                    }).catch(function(err) {
                        done(err);
                    });
                }
                else {
                    models.UserProfile.create({
                        userId: userProfile.userId,
                        directorId: userProfile.directorId,
                        name: userProfile.name,
                        score: userProfile.score,
                        scoreRelevance: userProfile.scoreRelevance,
                        seenCount: userProfile.seenCount
                    }).then(profile => {
                        done(null, profile);
                    }).catch(function(err) {
                        done(err);
                    });
                }
            }).catch(function(err) {
                done(err);
            });
        }
        else if (userProfile.country) {
            models.UserProfile.findOne({ where: { userId: userProfile.userId, country: userProfile.country } }).then(data => {
                if (data) {
                    data.score = userProfile.score;
                    data.scoreRelevance = userProfile.scoreRelevance;
                    data.seenCount = userProfile.seenCount;
                    data.save().then(profile => {
                        done(null, profile);
                    }).catch(function (err) {
                        done(err);
                    });
                }
                else {
                    models.UserProfile.create({
                        userId: userProfile.userId,
                        country: userProfile.country,
                        name: userProfile.name,
                        score: userProfile.score,
                        scoreRelevance: userProfile.scoreRelevance,
                        seenCount: userProfile.seenCount
                    }).then(profile => {
                        done(null, profile);
                    }).catch(function (err) {
                        done(err);
                    });
                }
            }).catch(function (err) {
                done(err);
            });
        }
    }

    return {
        getAll: getAll,
        createOrUpdate: createOrUpdate,
        hasEnoughProfiles: hasEnoughProfiles
    }
}

module.exports = userProfileService;