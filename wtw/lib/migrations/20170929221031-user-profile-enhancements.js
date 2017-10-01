'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
          'UserProfiles',
          'writerId',
          {
                type: Sequelize.INTEGER
          }
      );
    queryInterface.addColumn(
          'UserProfiles',
          'directorId',
          {
                type: Sequelize.INTEGER
          }
      );
    queryInterface.addColumn(
          'UserProfiles',
          'scoreRelevance',
          {
                type: Sequelize.FLOAT
          }
      );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
          'UserProfiles',
          'writerId',
          {
                type: Sequelize.INTEGER
          }
      );
    queryInterface.removeColumn(
          'UserProfiles',
          'directorId',
          {
                type: Sequelize.INTEGER
          }
      );
    queryInterface.removeColumn(
          'UserProfiles',
          'scoreRelevance',
          {
                type: Sequelize.FLOAT
          }
      );
  }
};
