'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
          'Users',
          'rememberMeCookie',
          {
                type: Sequelize.STRING
          }
      );
	  queryInterface.addColumn(
          'Users',
          'rememberMeExpiry',
          {
                type: Sequelize.DATE
          }
      );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
          'Users',
          'rememberMeCookie',
          {
                type: Sequelize.STRING
          }
      );
	  queryInterface.removeColumn(
          'Users',
          'rememberMeExpiry',
          {
                type: Sequelize.DATE
          }
      );
  }
};
