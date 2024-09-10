'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('countries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      country: {
        type: Sequelize.STRING,
	      allowNull: false
      },
      abbreviation: {
        type: Sequelize.STRING,
	      allowNull: false
      },
      phone_code: {
        type: Sequelize.STRING,
	      allowNull: false
      },
      status: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('countries');
  }
};
