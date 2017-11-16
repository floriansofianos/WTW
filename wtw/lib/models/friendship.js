'use strict';
module.exports = function(sequelize, DataTypes) {
  var Friendship = sequelize.define('friendship', {
    currentUserId: DataTypes.INTEGER,
    friendUserId: DataTypes.INTEGER,
    following: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
          Friendship.belongsTo(models.User, { as: 'currentUser', foreignKey: 'currentUserId' });
          Friendship.belongsTo(models.User, { as: 'friendUser', foreignKey: 'friendUserId' });
      }
    }
      });
  Friendship.associate = function (models) {
      Friendship.belongsTo(models.User, { as: 'currentUser', foreignKey: 'currentUserId' });
      Friendship.belongsTo(models.User, { as: 'friendUser', foreignKey: 'friendUserId' });
  }
  return Friendship;
};