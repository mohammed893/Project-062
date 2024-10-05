const express = require('express');
const {createIncreasement,
    readAllIncreasements,
    updateIncreasement,
    deleteIncreasement,
    readIncreasementById,
    readIncreasementsByEmployeeId
} = require('../../routes/increasements/increasements.controllers');
const Increasements = express.Router();
Increasements.post('/', createIncreasement);
Increasements.get('/',readAllIncreasements);
Increasements.get('/:id',readIncreasementById);
Increasements.get('/emp/:id' , readIncreasementsByEmployeeId);
Increasements.put('/:id',updateIncreasement);
Increasements.delete('/:id',deleteIncreasement);


module.exports = Increasements;
