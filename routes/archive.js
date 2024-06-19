const express = require('express');
const archive = express.Router();
const controller = require('../controllers/archive.controllers');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

archive.get('/:id', controller.get_doc);
archive.get('/:id/:images', controller.get_file);
archive.post('/addUser', controller.post_user);
archive.post('/addToUserArchive', upload.single('file'), controller.post_doc);
module.exports = archive;

