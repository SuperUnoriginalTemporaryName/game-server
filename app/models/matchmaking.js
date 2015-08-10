'use strict';
module.exports = function(sequelize, DataTypes) {
  var Matchmaking = sequelize.define('Matchmaking', {
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Matchmaking.belongsTo(models.User, {
          foreignKey: 'userId'
        });
      }
    }
  });
  return Matchmaking;
};