'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface
        .addColumn('Stats', 'createdAt', {
          allowNull: false,
          type: Sequelize.DATE
        }),
      queryInterface
        .addColumn('Stats', 'updatedAt', {
          allowNull: false,
          type: Sequelize.DATE
        })
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface
        .removeColumn('Stats', 'createdAt'),
      queryInterface
        .removeColumn('Stats', 'updatedAt')
    ];
  }
};
