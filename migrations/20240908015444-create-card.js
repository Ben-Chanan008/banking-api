'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cards', {
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
	      onDelete: 'CASCADE',
	      onUpdate: "NO ACTION"
      },
      card_number: {
        type: Sequelize.STRING,
	      allowNull: false
      },
      exp_date: {
        type: Sequelize.DATE,
	      allowNull: false
      },
      cvv: {
        type: Sequelize.STRING(3),
	      allowNull: false
      },
      card_type: {
        type: Sequelize.ENUM,
	      values: ['visa', 'master'],
	      allowNull: false
      },
      status: {
        type: Sequelize.ENUM,
	      values: ['active', 'pending', 'suspended'],
	      defaultValue: 'active'
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
		  allowNull: true,
		    type: Sequelize.DATE
	    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cards');
  }
};
