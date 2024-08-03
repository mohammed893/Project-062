const express = require('express');
const attendance = express.Router();
const attendanceController = require('../controllers/attendance.controllers');

attendance.post('/', attendanceController.insertMonth);
attendance.get('/', attendanceController.getMonth);
module.exports = attendance;