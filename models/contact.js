'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
	    this.belongsTo(models.BankAccount, {
			foreignKey: 'bank_account_id',
		    onDelete: "NO ACTION",
		    onUpdate: "NO ACTION"
	    });
    }
  }
  Contact.init({
    bank_account_id: DataTypes.BIGINT,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    account_number: DataTypes.STRING,
    bank_name: DataTypes.STRING,
    frequency: DataTypes.STRING,
    comments: DataTypes.TEXT,
    auto_deposit: DataTypes.BOOLEAN,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Contact',
	  underscored: true
  });
  return Contact;
};
