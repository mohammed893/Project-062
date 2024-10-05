// app.js
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const employees = require('./routes/employees/employees');
const vacations = require('./routes/vacations/vacations');
const penalties = require('./routes/penalties/penalties');
const promotions = require('./routes/promotions/promotion');
const requests = require('./routes/requests/requests');
const notify = require('./routes/notify/notify');
const auth = require('./routes/auth/auth');
const archive = require('./routes/archive/archive');
const training = require('./routes/training/training');
const Increasements = require('./routes/increasements/increasements');
const attendance = require('./routes/attendance/attendance');
const requestsArchive = require('./routes/archive/requests.archive');

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

