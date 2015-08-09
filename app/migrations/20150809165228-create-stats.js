'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('Stats', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        wins: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          allowNull: false
        },
        losses: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          allowNull: false
        },
        ties: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          allowNull: false
        },
        matches: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          allowNull: false
        },
        UserId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          model: 'Users',
          key: 'id',
          onDelete: 'CASCADE'
        }
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('Stats');
  }
};
