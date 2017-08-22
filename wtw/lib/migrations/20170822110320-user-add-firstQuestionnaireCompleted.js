'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.addColumn(
            'Users',
            'firstQuestionnaireCompleted',
            {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        );
    },

    down: function (queryInterface, Sequelize) {
        queryInterface.removeColumn(
            'Users',
            'firstQuestionnaireCompleted',
            {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        );
    }
};
