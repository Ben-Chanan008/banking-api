'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      username: {
        type: Sequelize.STRING(255),
	    allowNull: false
      },
      first_name: {
        type: Sequelize.STRING(255),
	    allowNull: false
      },
      last_name: {
        type: Sequelize.STRING(255),
	    allowNull: false
      },
      password: {
        type: Sequelize.TEXT('long'),
	    allowNull: false
      },
      phone: {
        type: Sequelize.TEXT('medium'),
	    allowNull: false
      },
      address: {
        type: Sequelize.TEXT('long'),
	    allowNull: true
      },
      is_active: {
        type: Sequelize.BOOLEAN,
	    allowNull: false,
	    defaultValue: 1
      },
      deleted_at: {
        type: Sequelize.DATE,
	    allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
