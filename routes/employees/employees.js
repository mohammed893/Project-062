// routes/employees.js
const express = require('express');
const employees = express.Router();
const employeeController = require('../../routes/employees/employees.controllers')

employees.post('/', employeeController.addNew);

employees.get('/', employeeController.readAll);

employees.put('/:id', employeeController.updateOne);

employees.delete('/:id', employeeController.DeleteOne);

employees.get('/Details/:id',employeeController.GetAround);

module.exports = employees;
