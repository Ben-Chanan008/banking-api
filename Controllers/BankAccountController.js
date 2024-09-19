const {BankAccount, Card, BankAccountBalance} = require("../models");
const helper = require("../helpers");
const moment = require("moment");
const Joi = require('joi').extend(require('@joi/date'))

const NUM = '0123456789';

const createAccount = async (req, res) => {
	let body = req.body;
	
	let bankAccountNumber = helper.generateRandomNumber(16),
	    transitNumber = helper.generateRandomNumber(5),
	    institutionNumber = helper.generateRandomNumber(3);
	
	while(await BankAccount.findOne({where: {account_number: bankAccountNumber}}))
		bankAccountNumber = helper.generateNumberLength(16);
	while(await BankAccount.findOne({where: {transit_number: transitNumber}}))
		transitNumber = helper.generateNumberLength(5);
	while(await BankAccount.findOne({where: {institution_number: institutionNumber}}))
		institutionNumber = helper.generateNumberLength(3);

	BankAccount.create({
		user_id: req.params.userId,
		account_number: bankAccountNumber,
		transit_number: transitNumber,
		institution_number: institutionNumber,
	}).then((response) => {
		return helper.response(res, {message: 'Bank Account created successfully'}, 200);
	}).catch(error => helper.response(res, {message: 'An Error Occurred', error}, 500));
}

const getAccount = (req, res) => {
	BankAccount.findOne({where: {id: req.params.id}}).then((response) => {
		if(response)
			return helper.response(res, {data: response.dataValues, message: 'Account fetched successfully'});
		else
			return helper.response(res, {message: 'Account not found'}, 404);
	}).catch(error => helper.response(res, {error}, 500));
}

const updatePassword = (req, res) => {
	let body = req.body;
	
	const validator = Joi.object({
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9+]{8,16}$')).required()
	});
	
	validator.validateAsync(body, {allowUnknown: true, abortEarly: false}).then(async (validated) => {
		Card.findOne({where: {bank_account_id: req.params.id}}).then((response) => {
			if(response)
				return helper.response(res, {message: 'Bank Account already owns a card'}, 422);
			else
				BankAccount.update({account_password: validated.password, status: 'active'}, {where: {id: req.params.id}}).then((response) => {
					if(response){
						BankAccount.findOne({where: {user_id: req.token.id, id: req.params.id, status: 'active'}}).then(async (response) => {
							if(response.dataValues){
								console.log(response.dataValues);
								let values = response.dataValues,
									cvv = helper.generateRandomNumber(3),
									cardNumber = helper.generateRandomNumber(16);
								
								while(await Card.findOne({where: {cvv}}))
									cvv = helper.generateRandomNumber(3);
								while(await Card.findOne({where: {card_number: cardNumber}}))
									cardNumber = helper.generateRandomNumber(16);
								Card.create({
									bank_account_id: values.id,
									card_number: cardNumber,
									cvv,
									issue_date: moment(moment.now()).format('YYY-MM-DD HH:mm:ss'),
									exp_date: moment().add(5, 'y').format('YYYY-MM-DD HH:mm:ss'),
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
						}).catch(error => helper.response(res, error, 500));
					}
				}).catch(error => helper.response(res, error, 500));
			}).catch(error => helper.response(res, helper.formatJoiError(error), 500));
		});
}

module.exports = { createAccount, getAccount, updatePassword }
