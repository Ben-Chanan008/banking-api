const express = require('express');
const router = express.Router();
const multer = require('multer');

const {validateToken} = require("../Middlewares/ValidateToken");
const TransactionController = require("../Controllers/TransactionController");
const formData = multer();

router.post('/send-money', formData.none(), validateToken, async (req, res) => {
	TransactionController.sendMoney(req, res);
});

router.post('/bills/pay', formData.none(), validateToken, async (req, res) => {
	TransactionController.payBills(req, res);
});

router.post('/bills/create/:bankAccountId', formData.none(), validateToken, async (req, res) => {
	TransactionController.createBill(req, res);
});

router.get('/bills/:bankAccountId', formData.none(), validateToken, async (req, res) => {
	TransactionController.getBills(req, res);
});

router.post('/contacts/create/:bankAccountId', formData.none(), validateToken, async (req, res) => {
	TransactionController.createContact(req, res);
});

router.get('/contacts/:bankAccountId', formData.none(), validateToken, async (req, res) => {
	TransactionController.getContacts(req, res);
});

router.get('/history/:cardId', formData.none(), validateToken, async (req, res) => {
	TransactionController.getTransactionHistory(req, res);
});

module.exports = router;
