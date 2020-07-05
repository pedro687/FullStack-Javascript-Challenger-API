'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('users', {
        id: { 
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        password_hash: {
          type: Sequelize.STRING,
          allowNull: false
        },
        provider: { 
          type: Sequelize.BOOLEAN,
          defaultValue: 0,
          allowNull: false
        },
        created_at: { 
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: { 
          type: Sequelize.DATE,
          allowNull: false
        }

      });
  },

  down: async (queryInterface) => {
     await queryInterface.dropTable('users');
  }
};
