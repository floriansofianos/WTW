'use strict';
module.exports = function(sequelize, DataTypes) {
  var PlexServerMovie = sequelize.define('PlexServerMovie', {
    plexServerId: DataTypes.INTEGER,
    movieDBId: DataTypes.INTEGER
  }, {
    classMethods: {
        associate: function (models) {
            PlexServerMovie.belongsTo(models.PlexServer);
        }
    }
      });
  PlexServerMovie.associate = function (models) {
      PlexServerMovie.belongsTo(models.PlexServer, { foreignKey: 'plexServerId' });
  }
  return PlexServerMovie;
};