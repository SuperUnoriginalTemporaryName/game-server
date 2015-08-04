'use strict';
module.exports = function(sequelize, DataTypes) {
  var Email = sequelize.define('Email', {
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Email.belongsTo(models.User, { foreignKey: 'UserId'})
      }
    }
  });
  return Email;
};