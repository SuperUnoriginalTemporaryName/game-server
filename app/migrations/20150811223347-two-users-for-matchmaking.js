'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface
        .addColumn('Matchmakings', 'userTwo', {
          type: Sequelize.INTEGER
        }),
      queryInterface
        .renameColumn('Matchmakings', 'userId', 'userOne')
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface
        .removeColumn('Matchmakings', 'userTwo'),
      queryInterface
        .renameColumn('Matchmakings', 'userOne', 'userId')
    ];
  }
};
