'use strict';
module.exports = function(sequelize, DataTypes) {
  var MovieInfoCache = sequelize.define('MovieInfoCache', {
    movieDBId: DataTypes.INTEGER,
    lang: DataTypes.STRING,
    data: DataTypes.JSON
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return MovieInfoCache;
};