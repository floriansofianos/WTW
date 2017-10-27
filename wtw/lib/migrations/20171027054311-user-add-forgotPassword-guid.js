'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
		queryInterface.addColumn(
            'Users',
            'forgotPasswordGuid',
            {
                type: Sequelize.STRING
            }
        );
    },

    down: function (queryInterface, Sequelize) {
		queryInterface.removeColumn(
            'Users',
            'forgotPasswordGuid',
            {
                type: Sequelize.STRING
            }
        );
    }
};