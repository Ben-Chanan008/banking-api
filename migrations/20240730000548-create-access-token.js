'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('access_tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      token: {
        type: Sequelize.STRING,
	    allowNull: false
      },
      user_id: {
        type: Sequelize.BIGINT(20).UNSIGNED,
	    allowNull: false,
	    references: {
			model: 'users',
		    key: 'id',
		    onDelete: 'CASCADE'
	    }
      },
      exp_date: {
        type: Sequelize.DATE,
	    allowNull: false
      },
	  status: {
		type: Sequelize.ENUM,
		values: ['active', 'used'],
		defaultValue: 'active',
		allowNull: false
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
    await queryInterface.dropTable('access_tokens');
  }
};
