var models = require('../models');

var userQuestionnaireService = function () {

    var getAll = function (userId, done) {
        models.UserQuestionnaire.findAll({ where: { userId: userId } }).then(data => {
            done(null, data);
        });
    }

    return {
        getAll: getAll
    }
}

module.exports = userQuestionnaireService;