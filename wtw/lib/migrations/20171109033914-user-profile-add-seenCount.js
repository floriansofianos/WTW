'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
            'UserProfiles',
            'seenCount',
            {
                type: Sequelize.INTEGER
            }
        );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
            'UserProfiles',
            'seenCount',
            {
                type: Sequelize.INTEGER
            }
        );
  }
};
