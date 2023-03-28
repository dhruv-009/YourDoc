const db = require('./db');
const helper = require('../helper');
const config = require('../dbconfig');
const bcrypt = require('bcrypt');

async function getById(creds) {
  const {email, password} = creds;
  const result = await db.query(
    `SELECT name, type, email, is_approved, specialization, latlong
    FROM user inner join doctor on user.id = doctor.user_id where user.email='${email}' and user.password='${password}'`
  );

  if (!result) {
  throw new Error("User not found");
  }

  return {result}
}

async function doctorInfo(creds){
  const {email, password} = creds;
  const result = await db.query(
      `SELECT * FROM user where email='${email}'`
  );
  if (result.length > 0) {
    const result1 = await bcrypt.compare(password, result[0].password);
    if (!result1) {
      throw new Error("Password Not Matched");
    }
  }
  if (!result || result.length == 0) {
      throw new Error("User not found");
  }
  return {result}
  
}

module.exports = {
    getById,
    doctorInfo
  }