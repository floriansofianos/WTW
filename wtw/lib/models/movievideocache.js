'use strict';
module.exports = function(sequelize, DataTypes) {
  var MovieVideoCache = sequelize.define('MovieVideoCache', {
    movieDBId: DataTypes.INTEGER,
    data: DataTypes.JSON
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return MovieVideoCache;
};