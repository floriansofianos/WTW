var models = require('../models');

var userProfileService = function () {

    var getAll = function (userId, done) {
        models.MovieQuestionnaire.findAll({ where: { userId: userId } }).then(data => {
            done(null, data);
        });
    }

    var createOrUpdate = function (userProfile, done) {
        if (userProfile.genreId) {
            models.UserProfile.findOne({ where: { userId: userProfile.userId, genreId: userProfile.genreId } }).then(data => {
                if (data) {
                    data.score = userProfile.score;
                    data.save().then(profile => {
                        done(null, profile);
                    });
                }
                else {
                    models.UserProfile.create({
                        userId: userProfile.userId,
                        genreId: userProfile.genreId,
                        name: userProfile.name,
                        score: userProfile.score
                    }).then(profile => {
                        done(null, profile);
                    });
                }
            });
        }
        else if (userProfile.castId) {
            models.UserProfile.findOne({ where: { userId: userProfile.userId, castId: userProfile.castId } }).then(data => {
                if (data) {
                    data.score = userProfile.score;
                    data.save().then(profile => {
                        done(null, profile);
                    });
                }
                else {
                    models.UserProfile.create({
                        userId: userProfile.userId,
                        castId: userProfile.castId,
                        name: userProfile.name,
                        score: userProfile.score
                    }).then(profile => {
                        done(null, profile);
                    });
                }
            });
        }
    }

    return {
        getAll: getAll,
        createOrUpdate: createOrUpdate
    }
}

module.exports = userProfileService;