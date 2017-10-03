var models = require('../models');
const Sequelize = require('../models').sequelize;

var userQuestionnaireService = function () {

    var getAll = function (userId, done) {
        models.UserQuestionnaire.findAll({ where: { userId: userId } }).then(data => {
            done(null, data);
        });
    }

    var getRandom = function (userId, done) {
        models.UserQuestionnaire.find({
            where: {
                userId: userId
            },
            order: [
                Sequelize.fn('RANDOM'),
            ] }).then(data => {
            done(null, data);
        });
    }

    var create = function (userId, movieDBId, done) {
        models.UserQuestionnaire.create({
            userId: userId,
            movieDBId: movieDBId
        }).then(userQuestionnaire => {
            done(null, userQuestionnaire);
        })
    }

    return {
        getAll: getAll,
        getRandom: getRandom,
        create: create
    }
}

module.exports = userQuestionnaireService;