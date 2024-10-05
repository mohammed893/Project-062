const Attendance = require('../../models/attendance.model');
const insertMonth = async (req, res) => {
  try {
    await Attendance.create(req.body);
    res.send("done");
  } catch (e) {
    res.send(`error: ${e}`);
  }
}
const getMonth = async (req, res) => {
  try {
    Attendance.findOne({ month: req.body.month }).then((result) => {
      res.send(result);
    })
  } catch (e) {
    res.send(`error: ${e}`);
  }
}
module.exports = {
  insertMonth,
  getMonth
}