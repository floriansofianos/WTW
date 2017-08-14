'use strict';
var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    lang: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
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