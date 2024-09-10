'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
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
  Bill.init({
    reference_number: DataTypes.STRING,
    bill_name: DataTypes.STRING,
    account_name: DataTypes.STRING,
    bank_name: DataTypes.STRING,
    description: {type: DataTypes.TEXT, defaultValue: null},
    deleted_at: {type: DataTypes.DATE, allowNull: true}
  }, {
    sequelize,
    modelName: 'Bill',
    paranoid: true,
	timestamps: true,
	underscored: true
  });
  return Bill;
};
