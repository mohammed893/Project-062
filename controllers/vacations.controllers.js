const pool = require('../models/database');


async function NewVac (req, res) {
    const { employeeID, startDate, endDate, duration } = req.body;
    try {
      const result = await pool.query(
        `INSERT INTO Vacations (EmployeeID, StartDate, EndDate, Duration)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [employeeID, startDate, endDate, duration]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
  
async function ReadAll (req, res) {
    try {
      const result = await pool.query('SELECT * FROM Vacations');
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }

async function updateOne(req, res)  {
    const { id } = req.params;
    const { employeeID, startDate, endDate, duration } = req.body;
    try {
      const result = await pool.query(
        `UPDATE Vacations SET EmployeeID = $1, StartDate = $2, EndDate = $3, Duration = $4 WHERE VacationID = $5 RETURNING *`,
        [employeeID, startDate, endDate, duration, id]
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
      await pool.query('DELETE FROM Vacations WHERE VacationID = $1', [id]);
      res.send('Vacation deleted successfully');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }

  module.exports = {
    NewVac , ReadAll , updateOne , DeleteOne
  }