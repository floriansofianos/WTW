'use strict';
module.exports = function(sequelize, DataTypes) {
  var TVQuestionnaire = sequelize.define('TVQuestionnaire', {
    userId: DataTypes.INTEGER,
    movieDBId: DataTypes.INTEGER,
    isSeen: DataTypes.BOOLEAN,
    rating: DataTypes.INTEGER,
    wantToSee: DataTypes.BOOLEAN,
    isSkipped: DataTypes.BOOLEAN
  }, {
          classMethods: {
              associate: function (models) {
                  TVQuestionnaire.belongsTo(models.User);
              }
          }
      });
  TVQuestionnaire.associate = function (models) {
      TVQuestionnaire.belongsTo(models.User, { foreignKey: 'userId' });
  }
  return TVQuestionnaire;
};