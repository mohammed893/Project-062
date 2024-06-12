const express = require('express');
const AllDetails = express.Router();
const FullDetalisController = require('../controllers/AllDetails.controllers'); 

AllDetails.get('/:id', FullDetalisController.GetAround);

module.exports = AllDetails;