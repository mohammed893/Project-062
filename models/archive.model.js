const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    filename: String,
    fileData: Buffer,
});

const penaltySchema = new mongoose.Schema({
    penalty: { type: imageSchema, required: true },
    penaltyRemoval: { type: imageSchema, required: false },
});

const employmentContractSchema = new mongoose.Schema({
    employmentContractData: { type: imageSchema, required: false },
    workStartContractData: { type: imageSchema, required: false },
});

const IDSchema = new mongoose.Schema({
    IDFace: imageSchema,
    IDBack: imageSchema,
});

const archiveSchema = new mongoose.Schema({
    name: { type: String, required: true },
    penalties: { type: [penaltySchema], required: false },
    vacations: { type: [imageSchema], required: false },
    employmentContract: { type: employmentContractSchema, required: false },
    innerTransfers: { type: [imageSchema], required: false },
    ID: { type: IDSchema, required: false },
    secondments: { type: [imageSchema], required: false },
    academicQualification: { type: imageSchema, required: false },
    certificates: { type: [imageSchema], required: false },
    privateVacations: { type: [imageSchema], required: false },
    disability: { type: [imageSchema], required: false },
    personalPhoto: { type: imageSchema, required: false },
    bankingTransactions: { type: [imageSchema], required: false },
});
const Archive = mongoose.model('archive', archiveSchema);
module.exports = Archive;

/* 
example for building the archive schema
{
  "penalties": [
    {
        "penaltyData": "file",
        "penaltyDate": "date",
        "penaltyRemoval": "file"
    },
    {
        "penaltyData": "file",
        "penaltyDate": "date",
        "penaltyRemoval": "file"
    }
  ],
  "vacations": [
    	{
        "vacationData": "file",
        "vacationDate": "date"
      },
    	{
        "vacationData": "file",
        "vacationDate": "date"
      }
  ],
  "employmentContract": {
    "employmentContractData": "file",
    "workStartContractData": "file"
  },
  "innerTransfers": [
    {
      "transferData": "file",
      "transferDate": "date"
    },
    {
      "transferData": "file",
      "transferDate": "date"
    }
  ],
  "ID": {
    "IDFace": "file",
    "IDBack": "file"
  },
  "secondments": [
    {
      "secondmentData": "file",
      "secondmentDate": "date"
    },
    {
      "secondmentData": "file",
      "secondmentDate": "date"
    }
  ],
  "academicQualification": "file",
  "certificates": [
    "file",
    "file",
    "file"
  ],
  "privateVacations": [
    "file",
    "file"
  ],
  "disability": "file",
  "personalPhoto": "file",
  "bankingTransactions": [
    {
      "transactionData": "file",
      "transactionDate": "date"
    }
  ]
}
*/
