'use strict';
module.exports = function(sequelize, DataTypes) {
  var MovieRecommandation = sequelize.define('MoviesRecommandation', {
    userId: DataTypes.INTEGER,
    movieDBId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
          MovieRecommandation.belongsTo(models.User);
      }
    }
      });
  MovieRecommandation.associate = function (models) {
      MovieRecommandation.belongsTo(models.User, { foreignKey: 'userId' });
  }
  return MovieRecommandation;
};