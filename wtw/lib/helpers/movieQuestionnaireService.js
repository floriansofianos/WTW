var models = require('../models');

var movieQuestionnaireService = function () {

    var getAll = function (userId, done) {
        models.MovieQuestionnaire.findAll({ where: { userId: userId } }).then(data => {
            done(null, data);
        });
    }

    var create = function (movieQuestionnaire, userId, done) {
        models.MovieQuestionnaire.create({
            userId: userId,
            movieDBId: movieQuestionnaire.movieDBId,
            isSeen: movieQuestionnaire.isSeen,
            rating: movieQuestionnaire.rating,
            wantToSee: movieQuestionnaire.wantToSee,
            isSkipped: movieQuestionnaire.isSkipped
        }).then(questionnaire => {
            done(null, questionnaire);
        });
    }

    return {
        getAll: getAll,
        create: create
    }
}

module.exports = movieQuestionnaireService;