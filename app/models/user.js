'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {}, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Email, { foreignKey: 'UserId' });
      }
    }
  });
  return User;
};