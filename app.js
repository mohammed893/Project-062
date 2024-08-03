// app.js
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const employees = require('./routes/employees');
const vacations = require('./routes/vacations');
const penalties = require('./routes/penalties');
const promotions = require('./routes/promotion');
const requests = require('./routes/requests');
const notify = require('./routes/notify');
const auth = require('./routes/auth');
const archive = require('./routes/archive');
const training = require('./routes/training');
const Increasements = require('./routes/increasements');
const attendance = require('./routes/attendance');
const requestsArchive = require('./routes/requests.archive');

app.use(cors({ origin: 'http://localhost:3000', }));
app.use(morgan(
   format = "combined",
));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/auth', auth);
app.use('/employees', employees);
app.use('/vacations', vacations);
app.use('/penalties', penalties);
app.use('/promotions', promotions);
app.use('/requests', requests);
app.use('/requestsArchive', requestsArchive);
app.use('/notify', notify);
app.use('/archive', archive);
app.use('/attendance', attendance);
app.use('/training', training);
app.use('/increasements', Increasements);
module.exports = app;

