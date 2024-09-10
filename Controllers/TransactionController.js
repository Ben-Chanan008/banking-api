const {BankAccount, TransactionHistory, BankAccountBalance, Bill, Contact} = require("../models");
const helper = require("../helpers");
const moment = require("moment");
const Joi = require('joi').extend(require('@joi/date'))

const sendMoney = (req, res) => {
	const body = req.body;
	const validation = Joi.object({
		account_number: Joi.string().required(),
		amount: Joi.number().precision(2).required(),
		currency: Joi.string().required(),
		is_expense: Joi.boolean().required(),
		receiver: Joi.array().required()
	});
	
	validation.validateAsync(body, {abortEarly: true, allowUnknown: true}).then(validated => {
		BankAccount.findOne({where: {account_number, status: 'active'}, include: {association: ['Card', 'BankAccountBalance']}}).then(response => {
			if(response.dataValues){
				let values = response.dataValues,
					balance = helper.operate(values.BankAccountBalance.amount, validated.amount, '-');
				
				TransactionHistory.create({
					card_id: values.Card.id,
					transaction: validated.amount,
					is_expense: validated.is_expense,
					balance
				}).then((response) => {
					BankAccountBalance.update({amount: response.balance, where: {card_id: values.Card.id}}).then((response) => {
						if(response)
							return helper.response(res, {message: 'Money successfully transferred'}, 200);
					});
				}).catch(error => helper.response(res, {message: 'An Error Occurred!', error}, 500));;
			}
		})
	}).catch((error) => helper.response(res,helper.formatJoiError(error), 422));;
}

const payBills = (req, res) => {
	let body = req.body;
	
	const validator = Joi.object({
		account_number: Joi.string().required(),
		bill_reference_number: Joi.string().required(),
		amount: Joi.number().precision(2).required(),
	});
	
	validator.validateAsync(body, {abortEarly: true, allowUnknown: true}).then(validated => {
		BankAccount.findOne({where: {account_number: validated.account_number}, include: {association: ['BankAccountBalance', 'Card']}}).then((response) => {
			if(response.dataValues){
				let values = response.dataValues;
				Bill.findOne({where: {reference_number: validated.bill_reference_number}}).then(response => {
					if(response.dataValues)
						TransactionHistory.create({
							card_id: values.Card.id,
							balance: helper.operate(values.BankAccountBalance.amount, validated.amount, '-'),
							is_expense: 1,
							transaction: validated.amount
						}).then(response => {
							BankAccountBalance.update({amount: response.balance, where: {card_id: values.Card.id}}).then((response) => {
								if(response)
									return helper.response(res, {message: 'Money successfully transferred'}, 200);
							});
						}).catch(error => helper.response(res, {message: 'An Error Occurred!', error}, 500));
				});
			}
		})
	}).catch((error) => helper.response(res,helper.formatJoiError(error), 422));
}

const createBill = (req, res) => {
	let body = req.body;
	
	const validate = Joi.object({
		reference_number: Joi.integer().required(),
		bill_name: Joi.string().required(),
		account_number: Joi.string().required(),
		bank_name: Joi.string().required(),
	});
	
	validate.validateAsync(body, {abortEarly: true, allowUnknown: true}).then((validated) => {
		Bill.create({
			bank_account_id: req.params.bankAccountId,
			reference_number: validated.reference_number,
			bill_name: validated.bill_name,
			account_number: validated.account_number,
			bank_name: validated.bank_name,
			description: body.description ?? null,
			frequency: body.frequency ?? null
		}).then(() => helper.response(res, {message: 'Bill Payment Added Successfully'}, 200));
	}).catch(error => helper.response(res, helper.formatJoiError(error), 422))
}

const createContact = (req, res) => {
	let body = req.body;
	
	const validate = Joi.object({
		email: Joi.email().required(),
		name: Joi.string().required(),
		account_number: Joi.string().required(),
		bank_name: Joi.string().required(),
	});
	
	validate.validateAsync(body, {abortEarly: true, allowUnknown: true}).then((validated) => {
		Contact.create({
			...validated,
			frequency: body.frequency ?? null,
			comments: body.comments ?? null,
			auto_deposit: body.auto_deposit ?? 0,
			bank_account_id: req.params.bankAccountId
		}).then(() => helper.response(res, {message: 'Contact registered successfully!'}, 200));
	}).catch(error => helper.response(res, helper.formatJoiError(error), 422));
}

const getContacts = (req, res) => {
	Contact.findAll({where: {bank_account_id: req.params.bankAccountId}, include: {association: 'BankAccount'}}).then((response) => {
		if(response)
			return helper.response(res, {message: 'Contacts fetched Successfully', data: response}, 200)
	}).catch(error => helper.response(res, {message: 'An Error Occurred', error}, 500));
}

const getBills = (req, res) => {
	Bill.findAll({where: {bank_account_id: req.params.bankAccountId}, include: {association: 'BankAccount'}}).then((response) => {
		if(response)
			return helper.response(res, {message: 'Contacts fetched Successfully', data: response}, 200)
	}).catch(error => helper.response(res, {message: 'An Error Occurred', error}, 500));
}

const getTransactionHistory = (req, res) => {
	TransactionHistory.findAll({where: {card_id: req.params.cardId}, include: {association: {'Card': ['BankAccount']}}}).then((response) => {
		if(response)
			return helper.response(res, {message: 'Contacts fetched Successfully', data: response}, 200)
	}).catch(error => helper.response(res, {message: 'An Error Occurred', error}, 500));
}

module.exports = { sendMoney, createBill, payBills, createContact, getContacts, getBills, getTransactionHistory };
