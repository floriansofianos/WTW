'use strict';
module.exports = function(sequelize, DataTypes) {
  var CastCache = sequelize.define('CastCache', {
    movieDBId: DataTypes.INTEGER,
    data: DataTypes.JSON
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return CastCache;
};