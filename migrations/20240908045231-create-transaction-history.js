'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaction_histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      transaction: {
        type: Sequelize.STRING,
	      allowNull: false
      },
      is_expense: {
        type: Sequelize.BOOLEAN,
	      allowNull: false
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
      balance: {
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
      },
      deleted_at: {
        type: Sequelize.DATE,
	      allowNull: true
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transaction_histories');
  }
};
