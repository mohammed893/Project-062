// routes/penalties.js
const express = require('express');
const Penalties = express.Router();
const penaltiesController = require("../controllers/penalties.controllers");
Penalties.post('/', penaltiesController.NewOne);

Penalties.get('/', penaltiesController.ReadAll);

Penalties.put('/:id', penaltiesController.updateOne);

Penalties.delete('/:id',penaltiesController.DeleteOne);

module.exports = Penalties;
