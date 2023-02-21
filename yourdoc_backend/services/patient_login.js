const db = require('./db');
const helper = require('../helper');
const config = require('../dbconfig');

async function getById(creds) {
    const {email, password} = creds;
    const result = await db.query(
      `SELECT name, type, email, dob, address, latlong, blood_group
    FROM user left join patient on user.id = patient.user_id where user.email='${email}' and user.password='${password}'`
    );
  
    if (!result) {
        throw new Error("User not found");
    }
    return {result}
  }

async function patientInfo(creds){
    const {email, password} = creds;
    const result = await db.query(
        `SELECT * FROM user where email='${email}' and password='${password}'`
    );
    if (!result) {
        throw new Error("User not found");
    }
    return {result}
    
}

module.exports = {
    getById,
    patientInfo
  }