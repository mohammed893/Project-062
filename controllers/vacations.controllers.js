const {pool} = require('../models/configrations');


async function NewVac (req, res) {
    const { employeeID, startDate, endDate, duration , typeofvacation } = req.body;
    try {
      const result = await pool.query(
        `INSERT INTO Vacations (EmployeeID, StartDate, EndDate, Duration ,typeofvacation )
         VALUES ($1, $2, $3, $4 , $5) RETURNING *`,
        [employeeID, startDate, endDate, duration , typeofvacation ]
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

  async function updateOne(req, res) {
    const { id } = req.params;
    const updates = req.body;
  
    const fields = [];
    const values = [];
    let query = 'UPDATE Vacations SET ';
  
    // Construct SET clause dynamically
    Object.keys(updates).forEach((field, index) => {
      fields.push(`${field} = $${index + 1}`);
      values.push(updates[field]);
    });
  
    // Add WHERE clause for the specific VacationID
    query += fields.join(', ');
    query += ` WHERE VacationID = $${values.length + 1} RETURNING *`;
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