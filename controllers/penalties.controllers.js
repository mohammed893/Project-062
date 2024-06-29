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
      res.status(500).send('Server Error ' + err);
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
  async function updateOne(req, res) {
    const { id } = req.params;
    const updates = req.body;
  
    const fields = [];
    const values = [];
    let query = 'UPDATE Penalties SET ';
  
    // Construct SET clause dynamically
    Object.keys(updates).forEach((field, index) => {
      fields.push(`${field} = $${index + 1}`);
      values.push(updates[field]);
    });
  
    // Add WHERE clause for the specific PenaltyID
    query += fields.join(', ');
    query += ` WHERE PenaltyID = $${values.length + 1} RETURNING *`;
    values.push(id);
  
    try {
      const result = await pool.query(query, values);
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