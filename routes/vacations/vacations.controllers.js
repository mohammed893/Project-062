const { query } = require('express');
const {pool} = require('../../models/configrations');
const {checkEmployeeExist , 
  checkVacationExit} = require('../../utils/checkers');

async function NewVac (req, res) {
    const { employeeID, startDate, endDate, duration , typeofvacation } = req.body;
    q = `INSERT INTO Vacations (EmployeeID, StartDate, EndDate, Duration ,typeofvacation )
         VALUES ($1, $2, $3, $4 , $5) RETURNING *`;
    try {
      const CheckEmployee = await checkEmployeeExist(employeeID);
      if(!CheckEmployee){
        return res.status(404).json({error : "Employee Not Found !"});
      }
      const result = await pool.query(q,
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
      vacationExist = await checkVacationExit(id);
      if(!vacationExist){
        return res.status(404).json({error : "Vacation Not Found !"});
      }
      if (updates.employeeID) {
        const employeeExist = await checkEmployeeExist(updates.employeeID);
        if (!employeeExist) {
          return res.status(404).json({ error: "Employee Not Found!" });
        }
      }
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Updating Vacation Error');
    }
  }
  
  
async function DeleteOne (req, res) {
    const { id } = req.params;
    const q = 'DELETE FROM Vacations WHERE VacationID = $1';
    try {
      vacationExist = await checkVacationExit(id);
      if(!vacationExist){
        return res.status(404).json({error : "Vacation Not Found !"});
      }
      await pool.query(q, [id]);
      res.send('Vacation deleted successfully');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Vacation Deletion Error');
    }
  }

  module.exports = {
    NewVac , ReadAll , updateOne , DeleteOne
  }