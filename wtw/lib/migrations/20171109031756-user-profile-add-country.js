'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
            'UserProfiles',
            'country',
            {
                type: Sequelize.STRING
            }
        );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
            'UserProfiles',
            'country',
            {
                type: Sequelize.STRING
            }
        );
  }
};
