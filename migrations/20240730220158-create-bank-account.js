'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bank_accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      user_id: {
        type: Sequelize.BIGINT(20).UNSIGNED,
        allowNull: false,
	    references: {
			model: 'users',
		    key: 'id'
	    },
		onDelete: "CASCADE",
        onUpdate: "NO ACTION"
      },
      account_number: {
        type: Sequelize.STRING,
	    allowNull: false
      },
      account_password: {
        type: Sequelize.TEXT('long'),
	    allowNull: true
      },
      transit_number: {
		  allowNull: false,
	      type: Sequelize.INTEGER(5),
      },
      institution_number: {
	      allowNull: false,
	      type: Sequelize.INTEGER(10),
      },
      status: {
        type: Sequelize.ENUM,
	    values: ['active', 'pending', 'closed'],
        defaultValue: 'pending',
	    allowNull: false
      },
      currency_type: {
        type: Sequelize.ENUM,
	    values: ['cad', 'pounds', 'usd', 'naira'],
	    defaultValue: 'usd',
	    allowNull: false
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('bank_accounts');
  }
};
