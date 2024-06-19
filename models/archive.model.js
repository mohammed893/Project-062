const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
  filename: String,
  fileData: Buffer,
});

const archiveSchema = new mongoose.Schema({
  name: { type: String, required: true },
  penalties: { type: [imageSchema], required: false },
  vacations: { type: [imageSchema], required: false },
  employmentContract: { type: [imageSchema], required: false },
  innerTransfers: { type: [imageSchema], required: false },
  ID: { type: [imageSchema], required: false },
  secondments: { type: [imageSchema], required: false },
  academicQualification: { type: [imageSchema], required: false },
  certificates: { type: [imageSchema], required: false },
  privateVacations: { type: [imageSchema], required: false },
  disability: { type: [imageSchema], required: false },
  personalPhoto: { type: [imageSchema], required: false },
  bankingTransactions: { type: [imageSchema], required: false },
});
const Archive = mongoose.model('archive', archiveSchema);
module.exports = Archive;