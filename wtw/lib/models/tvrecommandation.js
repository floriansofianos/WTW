'use strict';
module.exports = (sequelize, DataTypes) => {
  var TVRecommandation = sequelize.define('TVRecommandation', {
    userId: DataTypes.INTEGER,
    movieDBId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
          TVRecommandation.belongsTo(models.User);
      }
    }
  });
TVRecommandation.associate = function (models) {
      TVRecommandation.belongsTo(models.User, { foreignKey: 'userId' });
  }
  return TVRecommandation;
};