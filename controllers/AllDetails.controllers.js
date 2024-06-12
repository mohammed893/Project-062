const pool = require('../models/database');


async function GetAround (req, res) {
    const { id } = req.params;
  
    try {
      const employeeQuery = `SELECT * FROM Employees WHERE EmployeeID = $1`;
      const penaltiesQuery = `SELECT * FROM Penalties WHERE EmployeeID = $1`;
      const vacationsQuery = `SELECT * FROM Vacations WHERE EmployeeID = $1`;
      const promotionsQuery = `SELECT * FROM Promotions WHERE EmployeeID = $1`;
      const assignmentsQuery = `SELECT * FROM Assignments WHERE EmployeeID = $1`;
  
      const employeeResult = await pool.query(employeeQuery, [id]);
      const penaltiesResult = await pool.query(penaltiesQuery, [id]);
      const vacationsResult = await pool.query(vacationsQuery, [id]);
      const promotionsResult = await pool.query(promotionsQuery, [id]);
      const assignmentsResult = await pool.query(assignmentsQuery, [id]);
  
      if (employeeResult.rows.length === 0) {
        return res.status(404).send('Employee not found');
      }
  
      const employeeDetails = {
        employee: employeeResult.rows[0],
        penalties: penaltiesResult.rows,
        vacations: vacationsResult.rows,
        promotions: promotionsResult.rows,
        assignments: assignmentsResult.rows
      };
  
      res.json(employeeDetails);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
  
module.exports = {
    GetAround
}