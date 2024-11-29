const Joi = require("joi");
const helper = require('../helpers');
const bcrypt = require('bcryptjs');
const { AccessToken } = require('../models');
const jwt = require("jsonwebtoken");
const moment = require("moment");

const validateToken = (req, res, next) => {
	let bearerToken = req.header('Authorization');
	if (bearerToken) {
		try {
			const token = bearerToken.split(' ')[1];
			let verifiedToken = jwt.verify(token, process.env.APP_KEY);

			if (verifiedToken)
				AccessToken.findOne({ where: { user_id: verifiedToken.id, status: 'active', }, order: [['id', 'DESC']] }).then(response => {
					if (response) {
						if (token === response.dataValues.token) {
							const currentDate = moment().format();
							if (currentDate >= moment(response.dataValues.exp_date).format())
								AccessToken.update({ status: 'used' }, { where: { user_id: verifiedToken.id } }).then((response) => {
									if (response) {
										console.log(verifiedToken.id)
										return helper.response(res, { message: 'Please Login' }, 422);
									}
								}).catch(e => console.log(e));
							else {
								req.token = verifiedToken;
								return next();
							}
						} else
							return helper.response(res, { message: 'Token Mismatch' }, 400)
					} else
						return helper.response(res, { message: 'Please Login' }, 422);
				});
		} catch (e) {
			return helper.response(res, { message: 'Token has expired' }, 400)
		}
	} else
		return helper.response(res, { message: 'Unauthorized request' }, 401)
}

module.exports = { validateToken }
