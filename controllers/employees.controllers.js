const { pool } = require('../models/configrations');
const { post_user, delete_user } = require('./archive.controllers');
const { signup, delete_employee } = require('./auth.controllers');
async function addNew(req, res) {
  const allFields = [
    'name', 'nationalidnumber', 'dateofappointment', 'insurancenumber', 'contractdate',
    'functionalgroup', 'jobtitle', 'degree', 'address', 'dateoflastpromotion', 'role', 'gender', 'religion',
    'date_of_birth', 'phone_number', 'military_service_status', 'jobcategory', 'administration',
    'currentjob', 'qualification', 'contract', 'typeofcontract', 'report', 'employmentstatus', 'typeofemployment', 'maritalstatus'
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
      if (field === 'gender') {
        // Transform Arabic gender value to English abbreviation
        if (req.body[field] === 'ذكر') {
          values.push('M');
        } else if (req.body[field] === 'أنثى') {
          values.push('F');
        } else {
          values.push(null); // Handle other cases as needed
        }
      } else {
        values.push(req.body[field]);
      }
    } else {
      values.push(null); // Use null for PostgreSQL NULL value
    }
  });

  const placeholders = values.map((value, index) => `$${index + 1}`).join(', ');

  const query = `
    INSERT INTO public.employees (${fields.join(', ')})
    VALUES (${placeholders})
    RETURNING *;
  `;

  try {
    const result = await pool.query(query, values);
    res.json(result.rows[0]["employeeid"]);
    await post_user(result.rows[0]["employeeid"].toString());
    await signup(
      result.rows[0]["employeeid"].toString(),
      result.rows[0]["nationalidnumber"].toString());
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error:' + err);
  }
}

async function readAll(req, res) {
  try {
    const result = await pool.query('SELECT * FROM Employees');
    const transformedRows = result.rows.map(row => {
      // Transform 'M' and 'F' to Arabic equivalents
      return {
        ...row,
        gender: row.gender === 'M' ? 'ذكر' : (row.gender === 'F' ? 'أنثى' : row.gender)
        // Add additional transformations as needed for other fields
      };
    });
    res.json(transformedRows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error: ' + err);
  }
}
async function updateOne(req, res) {
  const { id } = req.params;
  const updates = req.body;

  const fields = [];
  const values = [];
  let query = 'UPDATE public.employees SET ';

  Object.keys(updates).forEach((field, index) => {
    if (field === 'gender') {
      // Transform 'ذكر' and 'أنثى' to 'M' and 'F' respectively before updating
      values.push(updates[field] === 'ذكر' ? 'M' : (updates[field] === 'أنثى' ? 'F' : updates[field]));
    } else {
      values.push(updates[field]);
    }
    fields.push(`${field} = $${index + 1}`);
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
//
async function DeleteOne(req, res) {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM Employees WHERE EmployeeID = $1', [id]).then(() => {
      console.log(`User ${id} Deleted From SQL DataBase !`);
    });
    await delete_user(id).then(() => {
      console.log(`User ${id} Deleted From Mongo DataBase !`);
    });
    await delete_employee(id);
    res.send('Employee deleted successfully ');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
async function GetAround(req, res) {
  const { id } = req.params;

  try {
    const employeeQuery = `SELECT * FROM Employees WHERE EmployeeID = $1`;
    const penaltiesQuery = `SELECT * FROM Penalties WHERE EmployeeID = $1`;
    const vacationsQuery = `SELECT * FROM Vacations WHERE EmployeeID = $1`;
    const promotionsQuery = `SELECT * FROM Promotions WHERE EmployeeID = $1`;
    const assignmentsQuery = `SELECT * FROM Assignments WHERE EmployeeID = $1`;
    const requestsQuery = `SELECT * FROM requests WHERE EmployeeID = $1`;
    const increasementQuery = `SELECT * FROM Increasement WHERE EmployeeID = $1`;
    const trainingQuery = `SELECT provider
             FROM employees AS e 
             JOIN training_participants AS tp ON e.employeeid = tp.employeeid
             JOIN training AS t ON tp.trainingid = t.trainingid
             WHERE e.employeeid = $1`;

    const employeeResult = await pool.query(employeeQuery, [id]);
    const penaltiesResult = await pool.query(penaltiesQuery, [id]);
    const vacationsResult = await pool.query(vacationsQuery, [id]);
    const promotionsResult = await pool.query(promotionsQuery, [id]);
    const assignmentsResult = await pool.query(assignmentsQuery, [id]);
    const requestsResult = await pool.query(requestsQuery, [id]);
    const increasementResult = await pool.query(increasementQuery, [id]);
    const trainingResult = await pool.query(trainingQuery, [id])

    if (employeeResult.rows.length === 0) {
      return res.status(404).send('Employee not found');
    }

    // Transform 'M' and 'F' back to 'ذكر' and 'أنثى' respectively in employee details
    const employeeDetails = {
      employee: {
        ...employeeResult.rows[0],
        gender: employeeResult.rows[0].gender === 'M' ? 'ذكر' : (employeeResult.rows[0].gender === 'F' ? 'أنثى' : employeeResult.rows[0].gender)
      },
      penalties: penaltiesResult.rows,
      vacations: vacationsResult.rows,
      promotions: promotionsResult.rows,
      assignments: assignmentsResult.rows,
      requests: requestsResult.rows,
      increasements: increasementResult.rows,
      trainings: trainingResult.rows
    };

    res.json(employeeDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error:' + err);
  }
}

module.exports = {
  addNew: addNew,
  readAll: readAll,
  updateOne: updateOne,
  DeleteOne: DeleteOne,
  GetAround
};