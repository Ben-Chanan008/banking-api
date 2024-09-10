'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bank_account_balances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      card_id: {
        type: Sequelize.BIGINT(20).UNSIGNED,
	      allowNull: false,
	      references: {
			model: 'cards',
	        key: 'id'
	      },
	      onDelete: "CASCADE",
	      onUpdate: "NO ACTION"
      },
      amount: {
        type: Sequelize.DECIMAL(11, 2),
	      allowNull: false
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
    await queryInterface.dropTable('bank_account_balances');
  }
};
