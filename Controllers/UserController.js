const Joi = require("joi");
const helper = require('../helpers');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const {Op} = require("sequelize");

const registerUser = (req, res) => {
	const body = req.body;
	const validator = Joi.object({
		email: Joi.string().email().required(),
		username: Joi.string().required(),
		first_name: Joi.string().required(),
		last_name: Joi.string().required(),
		phone: Joi.string().max(11).required(),
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,16}$')).required()
	});
	
	validator.validateAsync(body, {abortEarly: true, allowUnknown: true}).then((validated) => {
		User.findOne({where: {
			[Op.or]: [{email: validated.email}, {username: validated.username}]
		}}).then((response) => {
			if(!response)
				bcrypt.hash(validated.password, 10).then(hashed => {
					User.create({ ...validated, password: hashed}).then((data) => {
						helper.createDBToken(res, data.dataValues.id).then(response => {
							helper.response(res, { message: 'User created successfully', token: response.token }, 200)
						})
					}).catch(e => helper.response(res, { error: e }, 422))
				}).catch(e => helper.response(res, { error: e }, 500))
			else
				return helper.response(res, { message: 'User already exists!' }, 422);
		})
	}).catch((error) => helper.response(res,helper.formatJoiError(error), 422));
}

const getUser = (req, res) => {
	User.findOne({where: {id: req.params.id}}).then(response => {
		response ? helper.response(res, {message: 'User fetched successfully', data: response.dataValues}, 200) : helper.response(res, {message: 'User doesn\'t exist'}, 422);
	});
}

const getUsers = (req, res) => {
	User.findAll({ attributes: ['id', 'email', 'username', 'first_name', 'last_name', 'address', 'phone', 'created_at', 'updated_at'], include: [{association: 'BankAccounts'}] }).then(response => {
		if (response)
			return helper.response(res, {message: 'Users fetched successfully', data: response}, 200)
		else
			helper.response(res, {message: 'No Users yet'}, 422)
	})
}

module.exports = { registerUser, getUser, getUsers }
