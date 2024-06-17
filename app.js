// app.js
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const employees = require('./routes/employees');
const vacations = require('./routes/vacations');
const penalties = require('./routes/penalties');
const promotions = require('./routes/promotion');
const requests = require('./routes/requests');
const notify = require('./routes/notify');
app.use(cors({origin: 'http://localhost:3000',}));
app.use(morgan(
   format = "combined",
));
app.use(bodyParser.json());

app.use('/employees', employees);
app.use('/vacations' , vacations);
app.use('/penalties' , penalties);
app.use('/promotions', promotions);
app.use('/requests',requests)
app.use('/notify',notify);

module.exports = app;

