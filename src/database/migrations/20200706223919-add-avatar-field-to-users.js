'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.addColumn('users', 'avatar_id', {
        type: Sequelize.INTEGER,
        references: { model: "Files", key: 'id' },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true
      })
  },

  down: async (queryInterface) => {
      return queryInterface.removeColumn('users', 'avatar_id')
  }
};
