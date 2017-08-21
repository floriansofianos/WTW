'use strict';
module.exports = function(sequelize, DataTypes) {
  var MovieQuestionnaire = sequelize.define('MovieQuestionnaire', {
      movieDBId: DataTypes.INTEGER,
      isSeen: DataTypes.BOOLEAN,
      rating: DataTypes.INTEGER,
      wantToSee: DataTypes.BOOLEAN,
      isSkipped: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
          MovieQuestionnaire.belongsTo(models.User);
      }
    }
  });
  return MovieQuestionnaire;
};