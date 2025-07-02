'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BankAccountBalance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
	    this.belongsTo(models.Card, {
		    foreignKey: 'card_id',
		    onUpdate: "NO ACTION",
		    onDelete: "NO ACTION",
            as: 'balance'
	    });
    }
  }
  BankAccountBalance.init({
    card_id: DataTypes.BIGINT,
    amount: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'BankAccountBalance',
	  underscored: true
  });
  return BankAccountBalance;
};
