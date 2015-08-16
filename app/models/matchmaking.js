'use strict';
module.exports = function(sequelize, DataTypes) {
  var Matchmaking = sequelize.define('Matchmaking', {
    matched: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    cancelled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Matchmaking.hasOne(models.User, {
          as: 'userOne',
          foreignKey: 'id'
        });
        Matchmaking.hasOne(models.User, {
          as: 'userTwo', 
          foreignKey: 'id'
        });
      }
    }
  });
  return Matchmaking;
};