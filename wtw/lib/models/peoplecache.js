'use strict';
module.exports = function(sequelize, DataTypes) {
  var PeopleCache = sequelize.define('PeopleCache', {
    directorId: DataTypes.INTEGER,
    writerId: DataTypes.INTEGER,
    actorId: DataTypes.INTEGER,
    lang: DataTypes.STRING,
    data: DataTypes.JSON,
    creatorId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return PeopleCache;
};