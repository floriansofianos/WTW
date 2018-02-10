'use strict';
module.exports = (sequelize, DataTypes) => {
  var TVVideoCache = sequelize.define('TVVideoCache', {
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
  return TVVideoCache;
};