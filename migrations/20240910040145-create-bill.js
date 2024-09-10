'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bills', {
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
      reference_number: {
        type: Sequelize.STRING,
	      allowNull: false
      },
      bill_name: {
        type: Sequelize.STRING,
	      allowNull: false
      },
      account_name: {
        type: Sequelize.STRING,
	      allowNull: false
      },
      bank_name: {
        type: Sequelize.STRING,
	      allowNull: false
      },
      description: {
        type: Sequelize.TEXT('long'),
	      defaultValue: null
      },
		frequency: {
	        type: Sequelize.ENUM,
			values: ['week', 'month', 'year', 'day'],
	      defaultValue: null
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
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bills');
  }
};
