var models = require('../models');

var userQuestionnaireService = function () {

    var getAll = function (userId, done) {
        models.UserQuestionnaire.findAll({ where: { userId: userId } }).then(data => {
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
        create: create
    }
}

module.exports = userQuestionnaireService;