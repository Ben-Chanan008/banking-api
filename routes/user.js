const express = require('express');
const router = express.Router();

const multer = require('multer');
const formData = multer();
const  AuthController = require('../Controllers/AuthController');
const  UserController = require('../Controllers/UserController');
const { validateToken } = require('../Middlewares/ValidateToken');

router.post('/login', formData.none(), async (req, res, next) => {
	AuthController.login(req, res)
});

router.post('/register', formData.none(), async (req, res) => {
	UserController.registerUser(req, res);
});

router.get('/get-user/:id', validateToken, async (req, res) => {
	UserController.getUser(req, res);
});

router.get('/get-users', validateToken, async (req, res) => {
	UserController.getUsers(req, res);
});

module.exports = router;
