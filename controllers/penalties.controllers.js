const {pool} = require('../models/configrations');

async function NewOne (req, res) {
    const { employeeID, penaltyDescription, dateOfPenalty } = req.body;
    try {
      const result = await pool.query(
        `INSERT INTO Penalties (EmployeeID, PenaltyDescription, DateOfPenalty)
         VALUES ($1, $2, $3) RETURNING *`,
        [employeeID, penaltyDescription, dateOfPenalty]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
async function ReadAll (req, res) {
    try {
      const result = await pool.query('SELECT * FROM Penalties');
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
async function updateOne (req, res) {
    const { id } = req.params;
    const { employeeID, penaltyDescription, dateOfPenalty } = req.body;
    try {
      const result = await pool.query(
        `UPDATE Penalties SET EmployeeID = $1, PenaltyDescription = $2, DateOfPenalty = $3 WHERE PenaltyID = $4 RETURNING *`,
        [employeeID, penaltyDescription, dateOfPenalty, id]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
async function DeleteOne (req, res) {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM Penalties WHERE PenaltyID = $1', [id]);
      res.send('Penalty deleted successfully');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
  module.exports = {
    NewOne , ReadAll , updateOne , DeleteOne
  }