'use strict';
module.exports = function(sequelize, DataTypes) {
  var TimelineEvent = sequelize.define('TimelineEvent', {
    userId: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    variables: DataTypes.JSON,
    isShared: DataTypes.BOOLEAN
  }, {
          classMethods: {
              associate: function (models) {
                  TimelineEvent.belongsTo(models.User);
              }
    }
      });
  TimelineEvent.associate = function (models) {
      TimelineEvent.belongsTo(models.User, { foreignKey: 'userId' });
  }
  return TimelineEvent;
};