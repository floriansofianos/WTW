var models = require('../models');
const Sequelize = require('../models').sequelize;
var _ = require('underscore');

var movieRecommandationService = function() {

    var getAll = function (userId, done) {
        if (!userId) return [];
        models.MovieRecommandation.findAll({ where: { userId: userId } }).then(data => {
            done(null, data);
        }).catch(function(err) {
            done(err);
        });
    }

    var create = function(userId, movieDBId, done) {
        models.MovieRecommandation.create({
            userId: userId,
            movieDBId: movieDBId
        }).then(movieRecommandation => {
            done(null, movieRecommandation);
        }).catch(function(err) {
            done(err);
        });
    }

    var deleteRecommandation = function(userId, movieDBId, done) {
        models.MovieRecommandation.destroy({ where: { userId: userId, movieDBId: movieDBId } }).then(result => {
            done(null, result);
        }).catch(function(err) {
            done(err);
        });
    }

    var getScoreForUsers = function (userId, otherUserId, movieDBId, userProfileService, movieDBService, done) {
        if (otherUserId) {
            getScore(userId, movieDBId, userProfileService, movieDBService, function (err, res) {
                var userScore = res;
                if (err) return done(err);
                getScore(otherUserId, movieDBId, userProfileService, movieDBService, function (err, res) {
                    if (err) return done(err);
                    // calculate the average between the 2 scores
                    done(err, {
                        certaintyLevel: userScore.certaintyLevel,
                        comments: userScore.allComments,
                        score: (userScore.score + res.score) / 2
                    });
                });
            });
        }
        else {
            getScore(userId, movieDBId, userProfileService, movieDBService, function (err, res) {
                done(err, res);
            });
        }
    };

    var getScore = function(userId, movieDBId, userProfileService, movieDBService, done) {
        userProfileService.getAll(userId, function(err, profiles) {
            // filter out irrelevant profiles
            profiles = _.filter(profiles, function(p) { return p.scoreRelevance > 75 });
            // Get the selected movie
            movieDBService.getMovieWithAdditionalInfo(movieDBId, 'en', function(err, selectedMovie) {
                // filter the relevant profiles
                var directorIds = _.map(selectedMovie.directors, 'id');
                var genreIds = _.map(selectedMovie.genres, 'id');
                var writerIds = _.map(selectedMovie.writers, 'id');
                var actorIds = _.map(selectedMovie.actors, 'id');
                var country = selectedMovie.original_language;

                var directorProfiles = _.filter(profiles, function(p) { return p.directorId && _.contains(directorIds, p.directorId); });
                var genreProfiles = _.filter(profiles, function (p) { return p.genreId && _.contains(genreIds, p.genreId); });
                // Modify the genre profiles a bit: if we watch a lot of some genres, the score needs to be higher than it is
                var seenCountForGenres = _.reduce(_.filter(profiles, function (p) { return p.genreId; }), function (memo, p) { return memo + p.seenCount; }, 0);
                var numberOfGenres = _.size(_.filter(profiles, function (p) { return p.genreId; }));
                var seenCountAverage = numberOfGenres == 0 ? 0 : (seenCountForGenres / numberOfGenres);
                _.each(genreProfiles, function (p) {
                    // For genres where the score is in the middle and we watch a lot of those, it needs a big push in the score
                    if (p.score > 30 && p.score < 70 && ((p.seenCount - seenCountAverage) > (seenCountAverage / 2))) {
                        p.score += 30
                    }                    
                });
                var writerProfiles = _.filter(profiles, function(p) { return p.writerId && _.contains(writerIds, p.writerId); });
                var actorProfiles = _.filter(profiles, function (p) { return p.castId && _.contains(actorIds, p.castId); });
                var countryProfile = _.filter(profiles, function (p) { return p.country && p.country == country; });

                var allComments = _.map(directorProfiles.concat(genreProfiles.concat(writerProfiles.concat(actorProfiles.concat(countryProfile)))), function(p) {
                    var type = p.directorId ? 'DIRECTOR' : (p.writerId ? 'WRITER' : (p.genreId ? 'GENRE' : (p.country ? 'COUNTRY' : 'ACTOR')));
                    if (p.score > 75) return { level: 2, name: p.name, type: type };
                    else if (p.score > 60) return { level: 1, name: p.name, type: type };
                    else if (p.score < 25 && type != 'GENRE' && type != 'ACTOR' && type != 'COUNTRY') return { level: -2, name: p.name, type: type };
                    else if (p.score < 40 && type != 'GENRE' && type != 'ACTOR' && type != 'COUNTRY') return { level: -1, name: p.name, type: type };
                });
                allComments = _.filter(allComments, function(c) { return c; });
                var averageDirectors = directorProfiles.length > 0 ? (_.reduce(_.map(directorProfiles, 'score'), function(memo, p) { return memo + p }, 0)) / (_.size(directorProfiles)) : 0;
                var averageGenres = genreProfiles.length > 0 ? (_.reduce(_.map(genreProfiles, 'score'), function(memo, p) { return memo + p }, 0)) / (_.size(genreProfiles)) : 0;
                var averageWriters = writerProfiles.length > 0 ? (_.reduce(_.map(writerProfiles, 'score'), function(memo, p) { return memo + p }, 0)) / (_.size(writerProfiles)) : 0;
                var averageActors = actorProfiles.length > 0 ? (_.reduce(_.map(actorProfiles, 'score'), function(memo, p) { return memo + p }, 0)) / (_.size(actorProfiles)) : 0;

                var certaintyLevel = (directorProfiles.length > 0 ? 3 : 0) + (genreProfiles.length > 0 ? 1 : 0) + (writerProfiles.length > 0 ? 2 : 0) + (actorProfiles.length > 0 ? 1 : 0) + (countryProfile[0] ? 1 : 0);

                done(null, {
                    certaintyLevel: certaintyLevel,
                    comments: allComments,
                    score: certaintyLevel == 0 ? 0 : (((averageDirectors * 3) + (averageGenres) + (countryProfile[0] ? countryProfile[0].score : 0) + (averageActors) + (averageWriters * 2)) / certaintyLevel)
                });
            });

        })
    }

    return {
        getAll: getAll,
        create: create,
        deleteRecommandation: deleteRecommandation,
        getScore: getScore,
        getScoreForUsers: getScoreForUsers
    }
}

module.exports = movieRecommandationService;