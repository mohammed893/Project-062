const express = require('express');
const requestsArchive = express.Router();
const controller = require('../../routes/archive/requests.archive.controllers');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


requestsArchive.get('/:id', controller.getRequest);
requestsArchive.post('/:id', upload.single('file'), controller.postRequest);
module.exports = requestsArchive;
