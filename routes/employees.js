// routes/employees.js
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employees.controllers')
// Create a new employee
router.post('/', employeeController.addNew);

// Read all employees
router.get('/', employeeController.readAll);

// Update an employee
router.put('/:id', employeeController.updateOne);

// Delete an employee
router.delete('/:id', employeeController.DeleteOne);

module.exports = router;
