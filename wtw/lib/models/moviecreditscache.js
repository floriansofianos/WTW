'use strict';
module.exports = function(sequelize, DataTypes) {
  var MovieCreditsCache = sequelize.define('MovieCreditsCache', {
    movieDBId: DataTypes.INTEGER,
    data: DataTypes.JSON
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return MovieCreditsCache;
};