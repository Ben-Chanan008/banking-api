const {BankAccount, Card, BankAccountBalance} = require("../models");
const helper = require("../helpers");
const moment = require("moment");
const Joi = require('joi').extend(require('@joi/date'))

const NUM = '0123456789';

const createAccount = async (req, res) => {
	let body = req.body;
	
	let bankAccountNumber = helper.shuffle(NUM),
	    transitNumber = helper.shuffle(NUM),
	    institutionNumber = helper.shuffle(NUM);
	
	while(await BankAccount.findOne({where: {account_number: bankAccountNumber}}))
		bankAccountNumber = helper.shuffle(NUM);
	while(await BankAccount.findOne({where: {transit_number: transitNumber}}))
		transitNumber = helper.shuffle(NUM);
	while(await BankAccount.findOne({where: {institution_number: institutionNumber}}))
		institutionNumber = helper.shuffle(NUM);

	BankAccount.create({
		user_id: req.param.userId,
		account_number: bankAccountNumber,
		transit_number: transitNumber,
		institution_number: institutionNumber,
	}).then((response) => {
		return helper.response(res, {message: 'Bank Account created successfully'}, 200);
	});
}

const getAccount = (req, res) => {
	BankAccount.findOne({where: {id: req.params.id}}).then((res) => {
		if(res)
			return helper.response(res, {data: res.dataValues, message: 'Account fetched successfully'});
		else
			return helper.response(res, {message: 'Account not found'}, 404);
	}).catch(error => helper.response(res, {error}, 500));
}

const updatePassword = (req, res) => {
	let body = req.body;
	
	const validator = Joi.object({
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,16}$')).required()
	});
	
	validator.validateAsync(body, {allowUnknown: true, abortEarly: false}).then((validated) => {
		let hashed = bcrypt.hash(validated.password)
		BankAccount.update({account_password: validated.password, status: 'active'}, {where: {id: req.params.id}}).then((response) => {
			if(response)
				BankAccount.findOne({id: req.params.id, status: 'active'}).then(async (response) => {
					if(response.dataValues){
						let values = response.dataValues,
							cvv = helper.generateNumberLength(3),
							cardNumber = helper.generateNumberLength(16);
						
						while(await Card.findOne({where: {cvv}}))
							cvv = helper.generateNumberLength(3);
						while(await Card.findOne({where: {card_number: cardNumber}}))
							cardNumber = helper.generateNumberLength(16);
						
						Card.create({
							bank_account_id: values.id,
							card_number: cardNumber,
							cvv,
							issue_date: moment(moment.now()).format('YYY-MM-DD HH:mm:ss'),
							exp_date: moment(moment.now(), 'YYY-MM-DD HH:mm:ss').add(5, 'y').format('YYYY-MM-DD HH:mm:ss'),
							card_type: 'visa'
						}).then((response) => {
							if(response){
								BankAccountBalance.create({
									card_id: response.dataValues.id,
									amount: '100.00'
								}).then(() => helper.response(res, {message: 'Account password has been updated successfully and Card created'}, 200));
							}
						}).catch(error => helper.response(res, {message: 'An Error Occurred', error}));
					}
				});
		}).catch(error => helper.response(res, {error}, 500));
	});
}

module.exports = { createAccount, getAccount, updatePassword }
