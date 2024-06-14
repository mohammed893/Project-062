const express = require('express');
const archive = express.Router();
const controller = require('../controllers/archive.controllers');

archive.get('/:id', controller.get_doc);
// archive.get('/image', controller.get_file);
archive.post('/', controller.post_doc);
module.exports = archive;
