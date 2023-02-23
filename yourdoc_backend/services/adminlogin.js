const db = require('./db');
const helper = require('../helper');
const config = require('../dbconfig');

async function getById() {
  const result = await db.query(
    `SELECT name, type, specialization, hospital_id
    FROM user inner join doctor on user.id = doctor.user_id and is_approved = 0`
  );

  if (!result) {
  throw new Error("User not found");
  }

  return {result}
}

async function adminInfo(creds){
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
    adminInfo
  }