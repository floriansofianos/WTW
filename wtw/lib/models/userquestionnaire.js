'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserQuestionnaire = sequelize.define('UserQuestionnaire', {
    userId: DataTypes.INTEGER,
    movieDBId: DataTypes.INTEGER
  }, {});
  UserQuestionnaire.associate = function (models) {
      UserQuestionnaire.belongsTo(models.User, { foreignKey: 'userId' });
  }
  return UserQuestionnaire;
};