'use strict';
module.exports = function(sequelize, DataTypes) {
  var TVShowInfoCache = sequelize.define('TVShowInfoCache', {
    movieDBId: DataTypes.INTEGER,
    lang: DataTypes.STRING,
    data: DataTypes.JSONB
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return TVShowInfoCache;
};