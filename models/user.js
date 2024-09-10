'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
	    this.hasMany(models.AccessToken, {
			foreignKey: 'user_id',
		    onDelete: 'CASCADE',
		    onUpdate: 'NO ACTION'
	    });
		
		this.hasOne(models.BankAccount, {
			foreignKey: 'user_id',
			onDelete: 'CASCADE',
			onUpdate: 'NO ACTION'
		})
    }
  }
  User.init({
    email: {type: DataTypes.STRING, allowNull: false},
    username: {type: DataTypes.STRING, allowNull: false},
    first_name: {type: DataTypes.STRING, allowNull: false},
    last_name: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.TEXT('long'), allowNull: false},
    phone: {type: DataTypes.TEXT('medium'), allowNull: false},
    address: {type: DataTypes.TEXT('long'), allowNull: true},
    is_active: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 1},
    // deleted_at: {type: DataTypes.DATE, allowNull: true}
  }, {
    sequelize,
    modelName: 'User',
	paranoid: true,
	underscored: true,
	timestamps: true
  });
  return User;
};
