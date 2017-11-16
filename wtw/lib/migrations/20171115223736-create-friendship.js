'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('friendships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      currentUserId: {
        type: Sequelize.INTEGER,
		references: {
            model: "Users",
            key: "id"
        }
      },
      friendUserId: {
        type: Sequelize.INTEGER,
		references: {
            model: "Users",
            key: "id"
        }
      },
      following: {
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
    return queryInterface.dropTable('friendships');
  }
};