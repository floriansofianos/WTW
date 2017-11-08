'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
            'Users',
            'country',
            {
                type: Sequelize.STRING
            }
        );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
            'Users',
            'country',
            {
                type: Sequelize.STRING
            }
        );
  }
};
