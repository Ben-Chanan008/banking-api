const Joi = require("joi");
const helper = require('../helpers');
const bcrypt = require('bcryptjs');
const { User, AccessToken } = require('../models');
const {Op} = require("sequelize");
const moment = require("moment");

const login = (req, res) => {
	const validator = Joi.object({
		username: Joi.string().max(255),
		email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['co', 'uk', 'za', 'ca', 'com', 'net']} }),
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,16}$')).required()
	});
	
	let body = req.body
	
	validator.validateAsync(body, { allowUnknown: true, abortEarly: true }).then((validated) => {
		try{
			User.findOne({where: {
				[Op.or]: [{email: validated.email ?? null}, {username: validated.username ?? null}]
			}}).then((response) => {
				if(response)
					bcrypt.compare(validated.password, response.dataValues.password).then((match) => {
						if(match)
							AccessToken.findOne({where: {user_id: response.dataValues.id, status: 'active'}, order: [['id', 'DESC']]}).then(data => {
								if(data)
									if(moment(new Date()) >= moment(data.dataValues.exp_date))
										AccessToken.update({status: 'used'}, {where: {id: data.dataValues.id}}).then(() => {
											helper.createDBToken(res, response.dataValues.id).then((token) => {
												return helper.response(res,{ message: 'Login Successful', token}, 200);
											});
										});
									else
										return helper.response(res,{ message: 'User is already logged In', token: data.dataValues.token}, 201);
								else
									helper.createDBToken(res, response.dataValues.id).then((token) => {
										return helper.response({ message: 'Login Successful', token}, 200);
									});
							});
						else
							return helper.response({ message: 'Invalid credentials' }, 422)
					}).catch(e => console.log(e));
				else
					return helper.response({ message: 'User doesn\'t exist' }, 422)
			}).catch(e => console.log(e));
		} catch (e) {
			return helper.response(res, { message: 'An error Occurred', error: e}, 500);
		}
	}).catch((err) => console.log(err));
}

module.exports = { login }
