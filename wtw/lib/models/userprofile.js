'use strict';
module.exports = function (sequelize, DataTypes) {
    var UserProfile = sequelize.define('UserProfile', {
        userId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        genreId: DataTypes.INTEGER,
        castId: DataTypes.INTEGER,
        score: DataTypes.FLOAT,
        scoreRelevance: DataTypes.FLOAT,
        directorId: DataTypes.INTEGER,
        writerId: DataTypes.INTEGER,
        country: DataTypes.STRING,
        seenCount: DataTypes.INTEGER
    }, {
            classMethods: {
                associate: function (models) {
                    UserProfile.belongsTo(models.User);
                }
            }
        });
    UserProfile.associate = function (models) {
        UserProfile.belongsTo(models.User, { foreignKey: 'userId' });
    }
    return UserProfile;
};