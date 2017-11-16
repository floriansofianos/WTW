'use strict';
module.exports = function(sequelize, DataTypes) {
  var PendingFriendship = sequelize.define('PendingFriendship', {
    fromUserId: DataTypes.INTEGER,
    toUserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
          PendingFriendship.belongsTo(models.User, { as: 'fromUser', foreignKey: 'fromUserId' });
          PendingFriendship.belongsTo(models.User, { as: 'toUser', foreignKey: 'toUserId' });
      }
    }
      });
  PendingFriendship.associate = function (models) {
      PendingFriendship.belongsTo(models.User, { as: 'fromUser', foreignKey: 'fromUserId' });
      PendingFriendship.belongsTo(models.User, { as: 'toUser', foreignKey: 'toUserId' });
  }
  return PendingFriendship;
};