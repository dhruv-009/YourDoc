const db = require('./db');
const helper = require('../helper');
const config = require('../dbconfig');

async function getRegistrationInfo(creds) {
  const {id} = creds;
  const result = await db.query(
    `select * from user inner join doctor on user.id = doctor.user_id where user.id = '${id}'`
  );

  if (!result) {
  throw new Error("User not found");
  }

  return {result}
}

async function fillRegisterInfo(creds){
 const {id,name,type,dob,gender,phone,address,postalcode,avatar_url,email, password, specialization, is_approved, hospital_id} = creds;
  const result = await db.query(
    `Insert into user values('${id}','${email}','${password}','${name}','${type}','${phone}','${dob}','${gender}','${address}','${postalcode}','${avatar_url}')`
  );
  const result1 = await db.query(
    `insert into doctor values('${id}','${name}', '${specialization}', '${is_approved}', '${hospital_id}')`
  )
  if (!result && !result1) {
      throw new Error("User not found");
  }
  return {result, result1}
  
}

module.exports = {
    getRegistrationInfo,
    fillRegisterInfo
  }