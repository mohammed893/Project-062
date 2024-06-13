// app.js
const express = require('express');
const bodyParser = require('body-parser');
const employees = require('./routes/employees');
const vacations = require('./routes/vacations');
const penalties = require('./routes/penalties');
const promotions = require('./routes/promotion');



const app = express();
app.use(bodyParser.json());

app.use('/employees', employees);
app.use('/vacations' , vacations);
app.use('/penalties' , penalties);
app.use('/promotions', promotions);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
