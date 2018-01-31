'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('TVQuestionnaires', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
		references: {
            model: "Users",
            key: "id"
        }
      },
      movieDBId: {
        type: Sequelize.INTEGER,
		allowNull: false
      },
      isSeen: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      rating: {
        type: Sequelize.INTEGER
      },
      wantToSee: {
        type: Sequelize.BOOLEAN
      },
      isSkipped: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('TVQuestionnaires');
  }
};