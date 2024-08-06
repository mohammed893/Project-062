const {pool} = require('../models/configrations');
const notify = require('../controllers/socket.controllers')

async function AddOne (req, res) {
    const { employeeid, receiver_role, receiver_name, content, dateofrequest, requestType } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO requests (employeeid, receiver_role, receiver_name, content, dateofrequest, requestType) VALUES ($1, $2, $3, $4, $5, $6) RETURNING requestid',
            [employeeid, receiver_role, receiver_name, content, dateofrequest, requestType]
        );
        await notify.sendToClientByRole(receiver_role , result.rows[0]);
       
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


async function GetAll(req, res) {
    try {
        const result = await pool.query('SELECT * FROM requests');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function GetOne(req, res)  {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM requests WHERE requestid = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Request not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function GetWithRecieverType(req, res)  {
    const { Role } = req.params;
    try {
        const result = await pool.query('SELECT * FROM requests WHERE receiver_role = $1', [Role]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Request not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function UpdateContent (req, res) {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const result = await pool.query(
            'UPDATE requests SET content = $1 WHERE requestid = $2 RETURNING *',
            [content, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Request not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function UpdateStatus(req , res){
    const { id } = req.params;
    const { status } = req.body;
    try {
        const result = await pool.query(
            'UPDATE requests SET status = $1 WHERE requestid = $2 RETURNING employeeid , requestid , status',
            [status, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Request not found' });
        }
        // console.log(result.rows[0]);
        console.log(result.rows[0].status );
        await notify.sendToClientById( `${result.rows[0].employeeid}` ,{requId :result.rows[0].requestid 
            ,status: result.rows[0].status });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function UpdateRRole(req , res){
    const { id } = req.params;
    const { receiver_role } = req.body;
    try {
        const result = await pool.query(
            'UPDATE requests SET receiver_role = $1 WHERE requestid = $2 RETURNING *',
            [receiver_role, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Request not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function UpdateRType(req , res){
    const { id } = req.params;
    const { requestType } = req.body;
    try {
        const result = await pool.query(
            'UPDATE requests SET requestType = $1 WHERE requestid = $2 RETURNING *',
            [requestType, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Request not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getSameType(req , res){
    const { requestType } = req.params;
    try {
        const result = await pool.query('SELECT * FROM requests WHERE requestType = $1', [requestType]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getSameStatus(req , res){
    const { status } = req.params;
    try {
        const result = await pool.query('SELECT * FROM requests WHERE status = $1', [status]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


async function getForOne(req , res){
    const { employeeid } = req.params;
    try {
        const result = await pool.query('SELECT * FROM requests WHERE employeeid = $1', [employeeid]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function UpdateOne(req, res) {
    const { id } = req.params;
    const updates = req.body;
  
    const fields = [];
    const values = [];
    let query = 'UPDATE requests SET ';
  
    // Construct SET clause dynamically
    Object.keys(updates).forEach((field, index) => {
      fields.push(`${field} = $${index + 1}`);
      values.push(updates[field]);
    });
  
    // Add WHERE clause for the specific requestid
    query += fields.join(', ');
    query += ` WHERE requestid = $${values.length + 1} RETURNING *`;
    values.push(id);
  
    try {
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Request not found' });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  

async function DeleteOne(req , res){
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM requests WHERE requestid = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Request not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = {
    AddOne,
    GetAll,
    GetOne,
    UpdateOne,
    DeleteOne,
    UpdateContent,
    UpdateStatus,
    UpdateRRole,
    UpdateRType,
    getSameType,
    getForOne,
    getSameStatus,
    GetWithRecieverType
}