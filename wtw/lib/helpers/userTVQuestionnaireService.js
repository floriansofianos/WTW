var models = require('../models');
const Sequelize = require('../models').sequelize;

var userTVQuestionnaireService = function () {

    var getAll = function (userId, done) {
        models.UserTVQuestionnaire.findAll({ where: { userId: userId } }).then(data => {
            done(null, data);
        }).catch(function(err) {
            done(err);
        });
    }

    var getRandom = function (userId, done) {
        models.UserTVQuestionnaire.find({
            where: {
                userId: userId
            },
            order: [
                Sequelize.fn('RANDOM'),
            ] }).then(data => {
            done(null, data);
            }).catch(function(err) {
                done(err);
            });
    }

    var create = function (userId, movieDBId, done) {
        models.UserTVQuestionnaire.create({
            userId: userId,
            movieDBId: movieDBId
        }).then(userTVQuestionnaire => {
            done(null, userTVQuestionnaire);
        })
    }

    var deleteQuestionnaire = function(userId, movieDBId, done) {
        models.UserTVQuestionnaire.destroy({ where: { userId: userId, movieDBId: movieDBId } }).then(result => {
            done(null, result);
        }).catch(function(err) {
            done(err);
        });
    }

    return {
        getAll: getAll,
        getRandom: getRandom,
        create: create,
        deleteQuestionnaire: deleteQuestionnaire
    }
}

module.exports = userTVQuestionnaireService;