'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('PeopleCaches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      directorId: {
        type: Sequelize.INTEGER
      },
      writerId: {
        type: Sequelize.INTEGER
      },
      actorId: {
        type: Sequelize.INTEGER
      },
      lang: {
        type: Sequelize.STRING
      },
	  data: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('PeopleCaches');
  }
};