const express = require('express');
const Vacations = express.Router();
const VacationController = require('../controllers/vacations.controllers');
Vacations.post('/', VacationController.NewVac);
Vacations.get('/', VacationController.ReadAll);
Vacations.put('/:id', VacationController.updateOne);
Vacations.delete('/:id', VacationController.DeleteOne);

module.exports = Vacations;
