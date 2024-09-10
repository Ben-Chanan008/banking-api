'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
	    this.belongsTo(models.BankAccount, {
			foreignKey: 'bank_account_id',
		    onDelete: "CASCADE",
		    onUpdate: "NO ACTION"
	    });
	
	    this.hasMany(models.TransactionHistory, {
		    foreignKey: 'card_id',
		    onUpdate: "NO ACTION",
		    onDelete: "NO ACTION"
	    });
		
		this.hasMany(models.BankAccountBalance, {
		    foreignKey: 'card_id',
		    onUpdate: "NO ACTION",
		    onDelete: "NO ACTION"
	    });
    }
  }
  Card.init({
    bank_account_id: DataTypes.BIGINT(20).UNSIGNED,
    card_number: DataTypes.STRING,
    exp_date: DataTypes.DATE,
    cvv: DataTypes.STRING,
    card_type: {type: DataTypes.ENUM, values: ['master', 'visa']},
    status: {type: DataTypes.ENUM, values: ['active', 'pending', 'suspended']},
	  deleted_at: {type: DataTypes.DATE, defaultValue: null}
  }, {
    sequelize,
    modelName: 'Card',
    paranoid: true,
    timestamps: true,
    underscored: true
  });
  return Card;
};
