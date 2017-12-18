'use strict';
module.exports = function(sequelize, DataTypes) {
  var Notification = sequelize.define('Notification', {
    userId: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    variables: DataTypes.JSON,
    read: DataTypes.BOOLEAN
  }, {
    classMethods: {
        associate: function (models) {
            Notification.belongsTo(models.User);
        }
    }
      });
  Notification.associate = function (models) {
      Notification.belongsTo(models.User, { foreignKey: 'userId' });
  }
  return Notification;
};