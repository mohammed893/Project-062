const express = require('express');
const notify = express.Router();
const {notifyUser, notifyUsersByRole}  = require('../../middleware/socket.controllers')

notify.post('/', notifyUser);
notify.post('/role', notifyUsersByRole);
module.exports = notify;