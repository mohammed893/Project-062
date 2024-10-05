const {pool} = require ('../models/configrations');

async function checkEmployeeExist (employeeID) {
    const q = `SELECT * FROM Employees WHERE EmployeeID = $1`;
    try{
        const result = await pool.query(q , [employeeID]);
        return result.rows.length > 0;
    }catch{
        console.error(`Error checking employee existence: ${err.message}`);
        throw new Error('Database error');
    }
}

async function checkVacationExit (vacationid){
    const q =`SELECT * FROM Vacations WHERE VacationID = $1`;
    try {
        const result = await pool.query(q , [vacationid]);
        return result.rows.length > 0;
    }catch{
        console.error(`Error checking Vacation existence: ${err.message}`);
        throw new Error('Database error');
    }

}
module.exports = {
    checkEmployeeExist , 
    checkVacationExit
};