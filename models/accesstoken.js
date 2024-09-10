'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccessToken extends Model {
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
    }
  }
  AccessToken.init({
    token: {type: DataTypes.STRING, allowNull: false},
    user_id: {type: DataTypes.BIGINT(20).UNSIGNED, allowNull: false},
    exp_date: {type: DataTypes.DATE, allowNull: false},
    status: {type: DataTypes.ENUM, values: ['used', 'active'], defaultValue: 'active', allowNull: false},
    deleted_at: {type: DataTypes.DATE, allowNull: true}
  }, {
    sequelize,
    modelName: 'AccessToken',
	paranoid: true,
	timestamps: true,
    underscored: true
  });
  return AccessToken;
};
