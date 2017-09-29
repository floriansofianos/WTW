'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      queryInterface.addColumn(
          'Users',
          'profileRefresh',
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
          'profileRefresh',
          {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
          }
      );
  }
};
