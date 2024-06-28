const {pool} = require('../models/configrations');

async function addNew (req, res){
  const allFields = [
    'name', 'nationalidnumber', 'dateofappointment', 'insurancenumber', 'contractdate',
    'functionalgroup', 'jobtitle', 'degree', 'address', 'dateoflastpromotion', 'role', 'gender', 'religion',
    'date_of_birth', 'phone_number', 'military_service_status', 'jobcategory', 'administration',
    'currentjob', 'qualification', 'contract', 'typeofcontract', 'report', 'employmentstatus'
  ];

  // Extract provided fields and values from request body
  const providedFields = Object.keys(req.body);
  const providedValues = Object.values(req.body);

  // Create arrays for query
  const fields = [];
  const values = [];

  allFields.forEach(field => {
    fields.push(field);
    if (providedFields.includes(field)) {
      values.push(req.body[field]);
    } else {
      values.push(null); // Use null for PostgreSQL NULL value
    }
  });

  const placeholders = values.map((value, index) => `$${index + 1}`).join(', ');

  const query = `
    INSERT INTO public.employees (${fields.join(', ')})
    VALUES (${placeholders})
    RETURNING *
  `;

  try {
    const result = await pool.query(query, values);
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
      res.status(500).send('Server Error: ' +err);
    }
  }
async function updateOne (req, res) {
  const { id } = req.params;
  const updates = req.body;

  const fields = [];
  const values = [];
  let query = 'UPDATE public.employees SET ';

  Object.keys(updates).forEach((field, index) => {
    fields.push(`${field} = $${index + 1}`);
    values.push(updates[field]);
  });

  query += fields.join(', ');
  query += ` WHERE employeeid = $${fields.length + 1} RETURNING *`;
  values.push(id);

  try {
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error:' + err);
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
      const requestsQuery = `SELECT * FROM requests WHERE EmployeeID = $1`;
  
      const employeeResult = await pool.query(employeeQuery, [id]);
      const penaltiesResult = await pool.query(penaltiesQuery, [id]);
      const vacationsResult = await pool.query(vacationsQuery, [id]);
      const promotionsResult = await pool.query(promotionsQuery, [id]);
      const assignmentsResult = await pool.query(assignmentsQuery, [id]);
      const requestsResult = await pool.query(requestsQuery, [id]);

  
      if (employeeResult.rows.length === 0) {
        return res.status(404).send('Employee not found');
      }
  
      const employeeDetails = {
        employee: employeeResult.rows[0],
        penalties: penaltiesResult.rows,
        vacations: vacationsResult.rows,
        promotions: promotionsResult.rows,
        assignments: assignmentsResult.rows,
        requests:requestsResult.rows
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