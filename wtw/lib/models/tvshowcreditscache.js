'use strict';
module.exports = function(sequelize, DataTypes) {
  var TVShowCreditsCache = sequelize.define('TVShowCreditsCache', {
    movieDBId: DataTypes.INTEGER,
    data: DataTypes.JSONB
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return TVShowCreditsCache;
};