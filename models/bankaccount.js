'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BankAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
	    this.belongsTo(models.User, {
			foreignKey: 'user_id',
		    onUpdate: 'NO ACTION',
		    onDelete: 'CASCADE'
	    });
	
	    this.hasOne(models.Card, {
		    foreignKey: 'bank_account_id',
		    onDelete: "CASCADE",
		    onUpdate: "NO ACTION"
	    });
		
		this.hasMany(models.Bill, {
		    foreignKey: 'bank_account_id',
		    onDelete: "NO ACTION",
		    onUpdate: "NO ACTION"
	    });
		
		this.hasMany(models.Contact, {
		    foreignKey: 'bank_account_id',
		    onDelete: "NO ACTION",
		    onUpdate: "NO ACTION"
	    });
		
		
    }
  }
  BankAccount.init({
    user_id: {type: DataTypes.BIGINT(20).UNSIGNED, allowNull: false},
    account_number: {type: DataTypes.STRING(255), allowNull: false},
    issue_date: {type: DataTypes.DATE, allowNull: false},
    exp_date: {type: DataTypes.DATE, allowNull: false},
    account_password: {type: DataTypes.TEXT('long'), allowNull: true},
    status: {type: DataTypes.ENUM, values: ['active', 'pending', 'closed'], defaultValue: 'pending', allowNull: false},
    currency_type: {type: DataTypes.ENUM, allowNull: false, values: ['usd', 'cad', 'naira', 'pounds'], defaultValue: 'cad'},
	// deleted_at: {type: DataTypes.DATE, allowNull: true}
  }, {
    sequelize,
    modelName: 'BankAccount',
	paranoid: true,
	timestamps: true,
	underscored: true
  });
  return BankAccount;
};
