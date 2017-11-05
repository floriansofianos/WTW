'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      queryInterface.addColumn(
          'Users',
          'yearOfBirth',
          Sequelize.INTEGER
      );
  },

  down: function (queryInterface, Sequelize) {
      queryInterface.removeColumn(
          'Users',
          'yearOfBirth',
          Sequelize.INTEGER
      );
  }
};
