'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface
        .renameColumn('Emails', 'UserId', 'userId'),
      queryInterface
        .renameColumn('Stats', 'UserId', 'userId')
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface
        .renameColumn('Emails', 'userId', 'UserId'),
      queryInterface
        .renameColumn('Stats', 'userId', 'UserId')
    ];
  }
};
