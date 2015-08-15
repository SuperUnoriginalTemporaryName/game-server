'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {}, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Email, {
          as: 'emails',
          foreignKey: 'userId'
        });
        User.hasOne(models.Stats, { 
          as: 'stats',
          foreignKey: 'userId'
        });
      }
    }
  });
  return User;
};