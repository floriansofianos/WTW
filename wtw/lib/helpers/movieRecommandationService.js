var models = require('../models');
const Sequelize = require('../models').sequelize;

var movieRecommandationService = function () {

    var getAll = function (userId, done) {
        models.MovieRecommandation.findAll({ where: { userId: userId } }).then(data => {
            done(null, data);
        });
    }

    var create = function (userId, movieDBId, done) {
        models.MovieRecommandation.create({
            userId: userId,
            movieDBId: movieDBId
        }).then(movieRecommandation => {
            done(null, movieRecommandation);
        })
    }

    var deleteRecommandation = function(userId, movieDBId, done) {
        models.MovieRecommandation.destroy({ where: { userId: userId, movieDBId: movieDBId } }).then(result => {
            done(null, result);
        })
    }

    return {
        getAll: getAll,
        create: create,
        deleteRecommandation: deleteRecommandation
    }
}

module.exports = movieRecommandationService;