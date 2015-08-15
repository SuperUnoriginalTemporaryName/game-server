'use strict';
module.exports = function(sequelize, DataTypes) {
  var Matchmaking = sequelize.define('Matchmaking', {
  }, {
    classMethods: {
      associate: function(models) {
        Matchmaking.hasOne(models.User, {
          as: 'userOne',
          foreignKey: 'userId'
        });
        Matchmaking.hasOne(models.User, {
          as: 'userTwo', 
          foreignKey: 'userId'
        });
      }
    }
  });
  return Matchmaking;
};