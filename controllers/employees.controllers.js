const pool = require('../models/database');

async function addNew (req, res){
    const { name, nationalIDNumber, dateOfAppointment,
         insuranceNumber, contractDate, functionalGroup,
          jobTitle, degree, address, dateOfLastPromotion } = req.body;
    try {
      const result = await pool.query(
        `INSERT INTO Employees (Name, NationalIDNumber, DateOfAppointment, InsuranceNumber, ContractDate, FunctionalGroup, JobTitle, Degree, Address, DateOfLastPromotion)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [name, nationalIDNumber, dateOfAppointment, insuranceNumber, contractDate, functionalGroup, jobTitle, degree, address, dateOfLastPromotion]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }

async function readAll (req, res) {
    try {
      const result = await pool.query('SELECT * FROM Employees');
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
async function updateOne (req, res) {
    const { id } = req.params;
    const { name, nationalIDNumber, dateOfAppointment, insuranceNumber, contractDate, functionalGroup, jobTitle, degree, address, dateOfLastPromotion } = req.body;
    try {
      const result = await pool.query(
        `UPDATE Employees SET Name = $1, NationalIDNumber = $2, DateOfAppointment = $3, InsuranceNumber = $4, ContractDate = $5, FunctionalGroup = $6, JobTitle = $7, Degree = $8, Address = $9, DateOfLastPromotion = $10 WHERE EmployeeID = $11 RETURNING *`,
        [name, nationalIDNumber, dateOfAppointment, insuranceNumber, contractDate, functionalGroup, jobTitle, degree, address, dateOfLastPromotion, id]
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
      await pool.query('DELETE FROM Employees WHERE EmployeeID = $1', [id]);
      res.send('Employee deleted successfully');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
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
    addNew:addNew,
    readAll:readAll,
    updateOne:updateOne,
    DeleteOne:DeleteOne,
    GetAround
};