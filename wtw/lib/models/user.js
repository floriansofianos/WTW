'use strict';
var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    lang: DataTypes.STRING,
    age: DataTypes.INTEGER,
    firstQuestionnaireCompleted: DataTypes.BOOLEAN,
    profileRefresh: DataTypes.BOOLEAN,
    rememberMeCookie: DataTypes.STRING,
    rememberMeExpiry: DataTypes.DATE
  }, {});

  User.associate = function (models) {
      User.hasMany(models.MovieQuestionnaire, { foreignKey: 'userId' });
      User.hasMany(models.UserProfile, { foreignKey: 'userId' });
      User.hasMany(models.UserQuestionnaire, { foreignKey: 'userId' });
      User.hasMany(models.MovieRecommandation, { foreignKey: 'userId' });
  }

  User.prototype.generateHash = function (password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  User.validPassword = function (passwordPlain, encryptedPassword) {
      return bcrypt.compareSync(passwordPlain, encryptedPassword);
  };

  return User;
};