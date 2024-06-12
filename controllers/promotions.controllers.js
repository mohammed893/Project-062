const pool = require('../models/database');

async function addOne (req, res) {
    const { employeeID, previousDegree, newDegree, promotionDate, previousSalary, newSalary } = req.body;
    try {
      const result = await pool.query(
        `INSERT INTO Promotions (EmployeeID, PreviousDegree, NewDegree, PromotionDate, PreviousSalary, NewSalary)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [employeeID, previousDegree, newDegree, promotionDate, previousSalary, newSalary]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }

async function GetAll (req, res) {
    try {
      const result = await pool.query('SELECT * FROM Promotions');
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }

async function UpdateOne (req, res) {
    const { id } = req.params;
    const { employeeID, previousDegree, newDegree, promotionDate, previousSalary, newSalary } = req.body;
    try {
      const result = await pool.query(
        `UPDATE Promotions SET EmployeeID = $1, PreviousDegree = $2, NewDegree = $3, PromotionDate = $4, PreviousSalary = $5, NewSalary = $6 WHERE PromotionID = $7 RETURNING *`,
        [employeeID, previousDegree, newDegree, promotionDate, previousSalary, newSalary, id]
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
      await pool.query('DELETE FROM Promotions WHERE PromotionID = $1', [id]);
      res.send('Promotion deleted successfully');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }

  module.exports = {
    addOne, UpdateOne , GetAll , DeleteOne
  }