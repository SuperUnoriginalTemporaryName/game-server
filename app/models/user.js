'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {}, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Email, { foreignKey: 'userId' });
        User.hasOne(models.Stats, { 
          foreignKey: 'userId',
          as: 'Stats'
        });
      }
    }
  });
  return User;
};