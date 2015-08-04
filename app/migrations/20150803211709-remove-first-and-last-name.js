'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface
        .removeColumn('Users', 'first_name'),
      queryInterface
        .removeColumn('Users', 'last_name')
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface
        .addColumn('Users', 'first_name', Sequelize.STRING),
      queryInterface
        .addColumn('Users', 'last_name', Sequelize.STRING)
    ];
  }
};
