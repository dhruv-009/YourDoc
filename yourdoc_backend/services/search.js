const db = require('./db');
const helper = require('../helper');
const config = require('../dbconfig');
const { v4: uuid } = require('uuid');



async function getDocSpec(spec) {
  const result = await db.query(
      `SELECT * FROM doctor WHERE specialization = '${spec}'`
  );
  console.log(result);
  return {
    result
  }
}


async function searchName(docName) {
  const result = await db.query(
      `SELECT * FROM doctor WHERE name = '${docName}'`
  );
  console.log(result);
  return {
    result
  }
}

// getDocSpec('Dentist')

module.exports = {
  searchName,
  getDocSpec
}