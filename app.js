const express = require('express');
const db = require('./models');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./routes');
const moment = require("moment");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json({strict: false }));
app.use(express.urlencoded({extended: true }));


db.sequelize.sync({ alter: false}).then(()=> {
	app.listen(process.env.APP_PORT, () => console.log(`App started on port ${process.env.APP_PORT}`));
	
	app.use('/api/user', routes.user);
	app.use('/api/bank-account', routes.bank);
	app.use('/api/transactions', routes.transaction)
});
