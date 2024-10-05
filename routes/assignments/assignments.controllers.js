const {pool} = require('../../models/configrations');

async function AddOne (req, res) {
    const { employeeID, assignmentType, decisionDescription, startDate, endDate, duration } = req.body;
    try {
      const result = await pool.query(
        `INSERT INTO Assignments (EmployeeID, AssignmentType, DecisionDescription, StartDate, EndDate, Duration)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [employeeID, assignmentType, decisionDescription, startDate, endDate, duration]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
async function GetALl (req, res)  {
    try {
      const result = await pool.query('SELECT * FROM Assignments');
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
  async function UpdateOne(req, res) {
    const { id } = req.params;
    const updates = req.body;
  
    const fields = [];
    const values = [];
    let query = 'UPDATE Assignments SET ';
  
    // Construct SET clause dynamically
    Object.keys(updates).forEach((field, index) => {
      fields.push(`${field} = $${index + 1}`);
      values.push(updates[field]);
    });
  
    // Add WHERE clause for the specific AssignmentID
    query += fields.join(', ');
    query += ` WHERE AssignmentID = $${values.length + 1} RETURNING *`;
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
      await pool.query('DELETE FROM Assignments WHERE AssignmentID = $1', [id]);
      res.send('Assignment deleted successfully');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
module.exports = {
    AddOne , GetALl , UpdateOne , DeleteOne
}