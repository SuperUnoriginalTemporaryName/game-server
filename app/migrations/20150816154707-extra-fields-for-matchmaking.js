'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn('Matchmakings', 'matched', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }),
      queryInterface.addColumn('Matchmakings', 'cancelled', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      })
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('Matchmakings', 'matched'),
      queryInterface.removeColumn('Matchmakings', 'cancelled')
    ];
  }
};
