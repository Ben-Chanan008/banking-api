'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
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
		    onDelete: "NO ACTION"
	    });
    }
  }
  TransactionHistory.init({
    transaction: DataTypes.STRING,
    is_expense: DataTypes.BOOLEAN,
    deleted_at: DataTypes.DATE,
    card_id: DataTypes.BIGINT,
    balance: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'TransactionHistory',
	  paranoid: true,
	  timestamps: true,
	  underscored: true
  });
  return TransactionHistory;
};
