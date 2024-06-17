const pool = require('../models/database');

async function AddOne (req, res) {
    const { employeeid, receiver_role, receiver_name, content, dateofrequest, requestType } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO requests (employeeid, receiver_role, receiver_name, content, dateofrequest, requestType) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [employeeid, receiver_role, receiver_name, content, dateofrequest, requestType]
        );
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
            'UPDATE requests SET status = $1 WHERE requestid = $2 RETURNING *',
            [status, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Request not found' });
        }
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

async function getForOne(req , res){
    const { employeeid } = req.params;
    try {
        const result = await pool.query('SELECT * FROM requests WHERE employeeid = $1', [employeeid]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function UpdateOne (req , res){
    const { id } = req.params;
    const { employeeid, receiver_role, receiver_name, content, status, dateofrequest, requestType } = req.body;
    try {
        const result = await pool.query(
            'UPDATE requests SET employeeid = $1, receiver_role = $2, receiver_name = $3, content = $4, status = $5, dateofrequest = $6, requestType = $7 WHERE requestid = $8 RETURNING *',
            [employeeid, receiver_role, receiver_name, content, status, dateofrequest, requestType, id]
        );
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
    getForOne
}