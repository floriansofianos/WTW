'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserTVQuestionnaire = sequelize.define('UserTVQuestionnaire', {
    movieDBId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
          TVRecommandation.belongsTo(models.User);
      }
    }
      });
  UserTVQuestionnaire.associate = function (models) {
      UserTVQuestionnaire.belongsTo(models.User, { foreignKey: 'userId' });
  }
  return UserTVQuestionnaire;
};