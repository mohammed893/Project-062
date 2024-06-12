const pool = require('../models/database');

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

async function UpdateOne(req, res)  {
    const { id } = req.params;
    const { employeeID, assignmentType, decisionDescription, startDate, endDate, duration } = req.body;
    try {
      const result = await pool.query(
        `UPDATE Assignments SET EmployeeID = $1, AssignmentType = $2, DecisionDescription = $3, StartDate = $4, EndDate = $5, Duration = $6 WHERE AssignmentID = $7 RETURNING *`,
        [employeeID, assignmentType, decisionDescription, startDate, endDate, duration, id]
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