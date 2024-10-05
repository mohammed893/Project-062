const {pool} = require('../../models/configrations');

async function insertNewTraining(req, res) {
    const { startDate, endDate, provider, duration, specialization, status } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO training (startdate, enddate, provider, duration, specialization, status)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [startDate, endDate, provider, duration, specialization, status]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
async function insertPeopleIntoTraining(req, res) {
    const { trainingId, employeeId } = req.body;
    try {
        await pool.query(
            `INSERT INTO training_participants (trainingid, employeeid)
             VALUES ($1, $2)`,
            [trainingId, employeeId]
        );
        res.send('Participant added to training');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
async function selectProvidersOfTrainings(req, res) {
    try {
        const result = await pool.query(
            `SELECT provider FROM training `
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
async function selectProvidersFromEmployee(req, res) {
    const { id } = req.params;
    try {
        const result = await pool.query(
            `SELECT provider
             FROM employees AS e 
             JOIN training_participants AS tp ON e.employeeid = tp.employeeid
             JOIN training AS t ON tp.trainingid = t.trainingid
             WHERE e.employeeid = $1`,
            [id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
async function getEmployeesForProvider(req, res) {
    const { providerName } = req.params;
    try {
        const result = await pool.query(
            `SELECT e.name
             FROM employees AS e 
             JOIN training_participants AS tp ON e.employeeid = tp.employeeid
             JOIN training AS t ON tp.trainingid = t.trainingid
             WHERE t.provider = $1`,
            [providerName]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
async function updateTraining(req, res) {
    const { trainingId } = req.body;
    const updates = req.body;
  
    const fields = [];
    const values = [];
    let query = 'UPDATE training SET ';
  
    // Exclude trainingId from updates and handle separately
    delete updates.trainingId;
  
    // Construct SET clause dynamically
    Object.keys(updates).forEach((field, index) => {
      fields.push(`${field} = $${index + 1}`);
      values.push(updates[field]);
    });
  
    // Add WHERE clause for the specific trainingid
    query += fields.join(', ');
    query += ` WHERE trainingid = $${values.length + 1} RETURNING *`;
    values.push(trainingId);
  
    try {
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Training not found' });
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
async function updateTrainingStatus(req, res) {
    const { trainingId , status } = req.params;
    try {
        const result = await pool.query(
            `UPDATE training
             SET status = $1
             WHERE trainingid = $2
             RETURNING *`,
            [status, trainingId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Training not found with id ' + trainingId });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
async function deleteEmployeeFromTraining(req, res) {
    const { employeeId, trainingId } = req.params;
    try {
        await pool.query(
            `DELETE FROM training_participants
             WHERE employeeid = $1 AND trainingid = $2`,
            [employeeId, trainingId]
        );
        res.send('Employee removed from training');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
async function deleteTraining(req, res) {
    const { trainingId } = req.params;
    try {
        // await pool.query(
        //     `DELETE FROM training_participants WHERE trainingid = $1`,
        //     [trainingId]
        // );
        const result = await pool.query(
            `DELETE FROM training WHERE trainingid = $1 RETURNING *`,
            [trainingId]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
async function getAllTrainings(req, res) {
    try {
        const result = await pool.query(
            `SELECT *
             FROM training`
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

async function getAllTrainingsWithParticipants(req, res) {
    try {
        const result = await pool.query(
            `SELECT t.*, 
                STRING_AGG(e.employeeid::text, ', ') AS participants
                FROM public.employees AS e
                JOIN training_participants AS tp ON e.employeeid = tp.employeeid
                right JOIN training AS t ON t.trainingid = tp.trainingid
                -- where t.trainingid = $1
                GROUP BY t.trainingid
                ORDER BY t.trainingid;`
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
async function getTrainingByIdWithParticipants(req, res) {
    const {trainingId} = req.params;
    try {
        const result = await pool.query(
            `SELECT t.*, 
            STRING_AGG(e.employeeid::text, ', ') AS participants
            FROM public.employees AS e
            JOIN training_participants AS tp ON e.employeeid = tp.employeeid
            right JOIN training AS t ON t.trainingid = tp.trainingid
            where t.trainingid = $1
            GROUP BY t.trainingid
            ORDER BY t.trainingid;`,[trainingId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
module.exports = {
    insertNewTraining , 
    insertPeopleIntoTraining ,
    selectProvidersOfTrainings ,
    selectProvidersFromEmployee,
    getEmployeesForProvider ,
    updateTraining,
    updateTrainingStatus ,
    deleteEmployeeFromTraining , 
    deleteTraining ,
    getAllTrainings , 
    getAllTrainingsWithParticipants,
    getTrainingByIdWithParticipants
  }