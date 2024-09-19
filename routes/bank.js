const express = require('express');
const router = express.Router();
const multer = require('multer');
const formData = multer();

const {validateToken} = require("../Middlewares/ValidateToken");
const BankAccountController  = require('../Controllers/BankAccountController');

router.post('/create/:userId', formData.none(), validateToken, async (req, res) => {
	BankAccountController.createAccount(req, res)
});

router.get('/:id', validateToken, async (req, res) => {
	BankAccountController.getAccount(req, res);
});

router.put('/verify-account/:id', formData.none(), validateToken, async (req, res) => {
	BankAccountController.updatePassword(req, res);
});

module.exports = router;
