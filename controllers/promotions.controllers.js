const {pool} = require('../models/configrations');

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

  async function UpdateOne(req, res) {
    const { id } = req.params;
    const updates = req.body;
  
    const fields = [];
    const values = [];
    let query = 'UPDATE Promotions SET ';
  
    // Construct SET clause dynamically
    Object.keys(updates).forEach((field, index) => {
      fields.push(`${field} = $${index + 1}`);
      values.push(updates[field]);
    });
  
    // Add WHERE clause for the specific PromotionID
    query += fields.join(', ');
    query += ` WHERE PromotionID = $${values.length + 1} RETURNING *`;
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
      await pool.query('DELETE FROM Promotions WHERE PromotionID = $1', [id]);
      res.send('Promotion deleted successfully');
    } catch (err) 
    {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }

  module.exports = {
    addOne, UpdateOne , GetAll , DeleteOne
  }