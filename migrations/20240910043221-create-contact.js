'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      bank_account_id: {
        type: Sequelize.BIGINT(20).UNSIGNED,
	      allowNull: false,
	      references: {
			model: 'bank_accounts',
		      key: 'id'
	      },
	      onDelete: "NO ACTION",
	      onUpdate: "NO ACTION"
      },
      name: {
        type: Sequelize.STRING,
	      allowNull: false
      },
      email: {
        type: Sequelize.STRING,
	      allowNull: false
      },
      account_number: {
        type: Sequelize.STRING,
	      allowNull: false
      },
      bank_name: {
        type: Sequelize.STRING,
	      allowNull: false
      },
      frequency: {
        type: Sequelize.ENUM,
	      values: ['week', 'month', 'year', 'day'],
	      defaultValue: null
      },
      comments: {
        type: Sequelize.TEXT,
	      allowNull: true
      },
      auto_deposit: {
        type: Sequelize.BOOLEAN,
	      defaultValue: 0
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE,
	      defaultValue: null
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contacts');
  }
};
