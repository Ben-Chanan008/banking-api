const { AccessToken } = require('../models');
const moment = require("moment");
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const {parse} = require("dotenv");

dotenv.config();

const response = (res, data, status = 200) => {
	return res.status(status).json(data);
}

const generateNumberLength = (length) => {
	let number = Math.floor(Math.random() * length),
	shuffledNumber = shuffle(number.toString());
	
	return parseInt(shuffledNumber)
}

const generateRandomNumber = (length) => {
  if (length <= 0) {
    throw new Error('Length must be a positive integer.');
  }

  length = Math.floor(length);

  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber.toString().padStart(length, '0');
}

const operate = (x, y, operation) => {
	const operators = {
		'+': (x, y) => parseInt(x) + parseInt(y),
		'-': (x, y) => parseInt(x) - parseInt(y),
		'/': (x, y) => parseInt(x) / parseInt(y),
		'*': (x, y) => parseInt(x) * parseInt(y),
	}
	
	const callOperation = operators[operation];
	return callOperation(x, y);
}

const titleCase = function (value) {
	let titleCased = '',
		valueSplit = value.split(/([ _-])/gi);
	
	valueSplit.forEach((word) => {
		word = word.toLowerCase();
		let wordSplit = word.split(''),
			firstChar = wordSplit[0];
		wordSplit[0] = firstChar.toUpperCase();
		titleCased += wordSplit.join('');
	});
	return String(titleCased);
}

const formatJoiError = (errorDetails) => {
	const errors = {};
	
	(errorDetails.details && Array.isArray(errorDetails.details) && errorDetails.details.length) && errorDetails.details.forEach(detail => {
		const {message, context} = Object.keys(detail).length && detail;
		errors[context.key] = message.replace(/^("[A-Za-z_]+")*/g, titleCase(context.key).replace('_', " "));
	});
	
	return errors;
}

const createDBToken = (res, userId) => {
	let token = jwt.sign({ id: userId}, process.env.APP_KEY, { expiresIn: '24h' });
	return new Promise((resolve, reject) => {
		AccessToken.create({
			token,
			user_id: userId,
			exp_date: moment().add(24, 'hours')
		}).then((response) => resolve(response.dataValues)).catch(e => reject(e));
	});
}

const shuffle = (string) => {
	let a = string.split(""),
		n = a.length;
	
	for(let i = n - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let tmp = a[i];
		a[i] = a[j];
		a[j] = tmp;
	}
	return a.join("");
}

module.exports = { titleCase, formatJoiError, response, createDBToken, shuffle, generateRandomNumber, operate };
