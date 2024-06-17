const express = require('express');
const notify = express.Router();
const socketController  = require('../controllers/socket.controllers')

notify.post('/', socketController.notifyUser);
notify.post('/role', socketController.notifyUsersByRole);
module.exports = notify;