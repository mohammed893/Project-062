const {pool} = require('../models/configrations');

async function createIncreasement(req, res) {
    const { employeeID, newSalary, increasement, dateOfIncreasement } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO Increasement (EmployeeID, NewSalary, Increasement, DateOfIncreasement)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [employeeID, newSalary, increasement, dateOfIncreasement]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
async function readAllIncreasements(req, res) {
    try {
        const result = await pool.query('SELECT * FROM Increasement');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
async function updateIncreasement(req, res) {
    const { id } = req.params;
    const updates = req.body;

    const fields = [];
    const values = [];
    let query = 'UPDATE Increasement SET ';

    // Construct SET clause dynamically
    Object.keys(updates).forEach((field, index) => {
        fields.push(`${field} = $${index + 1}`);
        values.push(updates[field]);
    });

    // Add WHERE clause for the specific IncreasementID
    query += fields.join(', ');
    query += ` WHERE IncreasementID = $${values.length + 1} RETURNING *`;
    values.push(id);

    try {
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
async function deleteIncreasement(req, res) {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM Increasement WHERE IncreasementID = $1', [id]);
        res.send('Increasement deleted successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
async function readIncreasementsByEmployeeId(req, res) {
    const { id } = req.params; // Assuming the employee ID is passed as a route parameter

    try {
        const result = await pool.query('SELECT * FROM Increasement WHERE EmployeeID = $1', [id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
async function readIncreasementById(req, res) {
    const { id } = req.params; // Assuming the increasement ID is passed as a route parameter

    try {
        const result = await pool.query('SELECT * FROM Increasement WHERE IncreasementID = $1', [id]);
        
        if (result.rows.length > 0) {
            res.json(result.rows[0]); // Return the first (and only) row
        } else {
            res.status(404).send('Increasement not found');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    createIncreasement , 
    readAllIncreasements,
    updateIncreasement,
    deleteIncreasement,
    readIncreasementsByEmployeeId,
    readIncreasementById,
}