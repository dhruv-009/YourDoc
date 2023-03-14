const db = require('./db');
const helper = require('../helper');
const config = require('../dbconfig');
const bcrypt = require('bcrypt');

async function getById(creds) {
    const {email} = creds;
    const result = await db.query(
      `SELECT name, type, email, password, dob, address, latlong, blood_group
    FROM user inner join patient on user.id = patient.user_id where user.email='${email}'`
    );
    // if (result) {
    //   const result1 = await bcrypt.compare(password, result[0].password);
    //   if (!result1) {
    //     throw new Error("Password Not Matched");
    //   }
    // }
    if (!result) {
        throw new Error("User not found");
    }
    return {result}
  }

async function patientInfo(creds){
    const {email, password} = creds;
    const result = await db.query(
        `SELECT * FROM user where email='${email}'`
    );
    if (result) {
      const result1 = await bcrypt.compare(password, result[0].password);
      if (!result1) {
        throw new Error("Password Not Matched");
      }
    }
    if (!result) {
        throw new Error("User not found");
    }
    return {result}
    
}

module.exports = {
    getById,
    patientInfo
  }