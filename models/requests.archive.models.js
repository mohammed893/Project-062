const mongoose = require('mongoose');
const requestSchema = new mongoose.Schema({
  id: String,
  fileData: Buffer
});
const Request = mongoose.model('request', requestSchema);
module.exports = Request;