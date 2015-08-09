'use strict';
module.exports = function (sequelize, DataTypes) {
  var Stats = sequelize.define('Stats', {
    wins: DataTypes.INTEGER,
    losses: DataTypes.INTEGER,
    ties: DataTypes.INTEGER,
    matches: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        Stats.belongsTo(models.User, {
          foreignKey: 'userId'
        });
      }
    }
  });
  return Stats;
};