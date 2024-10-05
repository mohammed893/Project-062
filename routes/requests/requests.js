//routes/requests.js
const express = require('express');
const requests = express.Router();
const {AddOne,GetAll,GetOne,UpdateOne,DeleteOne,UpdateContent,UpdateStatus,
    UpdateRRole,UpdateRType,getSameType,getForOne,getSameStatus,GetWithRecieverType} 
    = require('../../routes/requests/requests.controllers');

requests.post('/' , AddOne);//CreateOne
requests.get('/',GetAll);//Get all 
requests.get('/:id',GetOne);//get specific 
requests.get('/Role/:Role',GetWithRecieverType);//get specific 
requests.put('/:id', UpdateOne);//update full request
requests.delete('/:id', DeleteOne);//delete specific
requests.patch('/:id/content',UpdateContent);//update only content
requests.patch('/:id/status',UpdateStatus);//update the status
requests.patch('/:id/receiver_role',UpdateRRole);//update Reciever Role
requests.patch('/:id/requestType',UpdateRType);//update Request Type
requests.get('/type/:requestType',getSameType);//get all with the same type
requests.get('/employee/:employeeid',getForOne);//get all for one employee
requests.get('/status/:status',getSameStatus);//get all for one employee


module.exports = requests;