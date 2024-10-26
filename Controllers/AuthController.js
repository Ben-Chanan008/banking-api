const Joi = require("joi");
const helper = require('../helpers');
const bcrypt = require('bcryptjs');
const { User, AccessToken } = require('../models');
const {Op, where} = require("sequelize");
const { jwtDecode } = require('jwt-decode');
const moment = require("moment");

const login = (req, res) => {
	const validator = Joi.object({
		logger: Joi.string().max(255),
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,16}$')).required()
	});
	
	let body = req.body
	
	validator.validateAsync(body, { allowUnknown: true, abortEarly: true }).then((validated) => {
		try{
			User.findOne({where: {
				[Op.or]: [{email: validated.logger ?? null}, {username: validated.logger ?? null}]
			}}).then((response) => {
				if(response)
					bcrypt.compare(validated.password, response.dataValues.password).then((match) => {
						if(match)
							AccessToken.findOne({where: {user_id: response.dataValues.id, status: 'active'}, order: [['id', 'DESC']]}).then(data => {
								if(data)
									if(moment(new Date()) >= moment(data.dataValues.exp_date))
										AccessToken.update({status: 'used'}, {where: {id: data.dataValues.id}}).then(() => {
											helper.createDBToken(res, response.dataValues.id).then((token) => {
												return helper.response(res,{ message: 'Login Successful', token: token.token}, 200);
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
					return helper.response(res,{ message: 'User doesn\'t exist' }, 422)
			}).catch(e => console.log(e));
		} catch (e) {
			return helper.response(res, { message: 'An error Occurred', error: e}, 500);
		}
	}).catch((err) => console.log(err));
}

const verify = (req, res) => {
	let token = req.header('Authorization'),
		bearerToken = token.split(' ')[1];
	if(token)
		try{
			let verifiedToken = jwt.verify(bearerToken, process.env.APP_KEY);
			if(verifiedToken)
				return helper.response(res, {message: 'VERIFIED!!', is_verified: true}, 200);
		} catch(e){
			let decodedToken = jwtDecode(bearerToken);
			AccessToken.update({status: 'used'}, {where: {id: decodedToken.id}}).then(response => {
				if(response)
					return helper.response(res, {message: 'NOT VERIFIED!!', is_verified: false}, 400);
			}).catch(error => helper.response(res, {error, message: 'An Error Occured'}, 500));
		}
}

module.exports = { login, verify }
