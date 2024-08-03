const mongoose = require('mongoose');
const monthSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true
  },
  attendance: {
    type: Map,
    required: true
  }
});
const Attendance = mongoose.model('attendance', monthSchema);
module.exports = Attendance;