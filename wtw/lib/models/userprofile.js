'use strict';
module.exports = function (sequelize, DataTypes) {
    var UserProfile = sequelize.define('UserProfile', {
        userId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        genreId: DataTypes.INTEGER,
        castId: DataTypes.INTEGER,
        score: DataTypes.FLOAT
    }, {
            classMethods: {
                associate: function (models) {
                    UserProfile.belongsTo(models.User);
                }
            }
        });
    return UserProfile;
};