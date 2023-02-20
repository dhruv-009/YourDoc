const db = require('./db');
const helper = require('../helper');
const config = require('../dbconfig');

async function getById(creds) {
    const {patient_id} = creds;
    const result = await db.query(
      `SELECT *
      FROM user where id='${patient_id}'`
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