const express = require('express');
const dotenv = require('dotenv').config();
const db = require('./models');
const cors = require('cors');
const routes = require('./routes');
const moment = require("moment");
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const winston = require('winston');

const paspportStrategy = require('./Controllers/SocialLoginController');
const app = express();

app.use(cors());
app.use(express.json({strict: false }));
app.use(express.urlencoded({extended: true }));


// const activityLog = fs.createWriteStream(path.join(__dirname, 'activity.log'), {flags: 'a'});

// app.use(morgan('combined', {stream: activityLog}));
const logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(winston.format.timestamp(), winston.format.printf(({timestamp, level, message}) => {
		return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
	})),
	transports: [new winston.transports.File({filename: 'activity.log'})]
});

app.use((req, res, next) => {
	logger.info(`Request: ${req.method} ${req.url}`);
	next();
})


db.sequelize.sync({ alter: false}).then(()=> {
	app.listen(process.env.APP_PORT, () => console.log(`App started on port ${process.env.APP_PORT}`));

	app.use('/api/user', routes.user);
	app.use('/api/bank-account', routes.bank);
	app.use('/api/transactions', routes.transaction)
});
