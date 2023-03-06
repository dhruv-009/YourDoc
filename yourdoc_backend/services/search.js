const db = require('./db');
const helper = require('../helper');
const config = require('../dbconfig');
const { v4: uuid } = require('uuid');



async function getDocSpec(spec) {
  const result = await db.query(
      `SELECT * FROM doctor WHERE specialization = '${spec}' and is_approved = 1`
  );
  console.log(result);
  return {
    result
  }
}

async function searchName(docName) {
  const result = await db.query(
      `SELECT * FROM doctor WHERE name = '${docName}' and is_approved = 1`
  );
  console.log(result);
  return {
    result
  }
}

async function searchPinCode(pinCode) {
    const result = await db.query(
        `SELECT * FROM doctor INNER JOIN user ON address = '${pinCode}' and is_approved = 1;`
    );
    console.log(result);
    return {
        result
    }
}

module.exports = {
    searchName,
    getDocSpec,
    searchPinCode
}