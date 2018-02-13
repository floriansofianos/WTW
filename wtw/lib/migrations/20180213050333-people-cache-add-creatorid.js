'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
            'PeopleCaches',
            'creatorId',
            {
                type: Sequelize.INTEGER
            }
        );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
            'PeopleCaches',
            'creatorId',
            {
                type: Sequelize.INTEGER
            }
        );
  }
};
