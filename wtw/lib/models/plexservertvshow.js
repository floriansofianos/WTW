'use strict';
module.exports = (sequelize, DataTypes) => {
  var PlexServerTVShow = sequelize.define('PlexServerTVShow', {
    plexServerId: DataTypes.INTEGER,
    movieDBId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        PlexServerTVShow.belongsTo(models.PlexServer);
      }
    }
  });
    PlexServerTVShow.associate = function (models) {
      PlexServerTVShow.belongsTo(models.PlexServer, { foreignKey: 'plexServerId' });
  }
  return PlexServerTVShow;
};