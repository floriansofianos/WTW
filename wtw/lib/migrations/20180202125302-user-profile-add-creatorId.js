'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
            'UserProfiles',
            'creatorId',
            {
                type: Sequelize.INTEGER
            }
        );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
            'UserProfiles',
            'creatorId',
            {
                type: Sequelize.INTEGER
            }
        );
  }
};
