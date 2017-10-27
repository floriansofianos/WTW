'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.addColumn(
            'Users',
            'emailValidated',
            {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        );
		queryInterface.addColumn(
            'Users',
            'emailValidationGuid',
            {
                type: Sequelize.STRING
            }
        );
    },

    down: function (queryInterface, Sequelize) {
        queryInterface.removeColumn(
            'Users',
            'emailValidated',
            {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        );
		queryInterface.removeColumn(
            'Users',
            'emailValidationGuid',
            {
                type: Sequelize.STRING
            }
        );
    }
};
