//routes/training.js
const express = require('express');
const training = express.Router();
const {insertNewTraining , //Add a training (Provider)
    insertPeopleIntoTraining ,//connect specific employee to specific training
    selectProvidersOfTrainings ,//returns all the providers in a list (specific for Omar)
    selectProvidersFromEmployee,//returns all the provider for One emp
    getEmployeesForProvider ,//get All the emps for specific provider
    updateTraining,//Update General Training Data (date , provider , duration , status)
    updateTrainingStatus ,//update Only the status
    deleteEmployeeFromTraining , //Remove employee from a specific training
    deleteTraining,// Delete a whole training
    // getAllTrainings,
    getAllTrainingsWithParticipants,
    getTrainingByIdWithParticipants
} = require('../controllers/training.controllers');

training.post('/', insertNewTraining);
training.post('/emp', insertPeopleIntoTraining);
training.get('/', getAllTrainingsWithParticipants);
training.get('/:trainingId', getTrainingByIdWithParticipants);
training.get('/provider', selectProvidersOfTrainings);
training.get('/:id/ProvidersForEmp', selectProvidersFromEmployee);
training.get('/EmpsForProvider/:providerName' , getEmployeesForProvider);
training.put('/', updateTraining);
training.patch('/:trainingId/status/:status', updateTrainingStatus);
training.delete('/:trainingId', deleteTraining);
training.delete('/emp/:employeeId/training/:trainingId',deleteEmployeeFromTraining);

module.exports = training;