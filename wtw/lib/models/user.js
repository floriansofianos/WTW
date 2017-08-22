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
    firstQuestionnaireCompleted: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
          User.hasMany(models.MovieQuestionnaire);
      }
    }
        });

  User.prototype.generateHash = function (password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  User.validPassword = function (password) {
      return bcrypt.compareSync(password, this.password);
  };

  return User;
};