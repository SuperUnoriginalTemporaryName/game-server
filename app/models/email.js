'use strict';
module.exports = function(sequelize, DataTypes) {
  var Email = sequelize.define('Email', {
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Email;
};