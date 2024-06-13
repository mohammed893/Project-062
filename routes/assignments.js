// routes/assignments.js
const express = require('express');
const assignments = express.Router();
const assignmentsController = require('../controllers/assignments.controllers');

assignments.post('/', assignmentsController.AddOne);
assignments.get('/', assignmentsController.GetALl);
assignments.put('/:id', assignmentsController.UpdateOne);
assignments.delete('/:id', assignmentsController.DeleteOne);
module.exports = assignments;
