'use strict';
module.exports = function(sequelize, DataTypes) {
  var PlexServer = sequelize.define('PlexServer', {
    url: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
      });

  PlexServer.associate = function (models) {
      PlexServer.hasMany(models.PlexServerMovie, { foreignKey: 'plexServerId' });
      PlexServer.hasMany(models.User, { foreignKey: 'plexServerId' });
  }
  return PlexServer;
};