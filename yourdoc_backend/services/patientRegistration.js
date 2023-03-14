const db = require('./db');
const helper = require('../helper');
const config = require('../dbconfig');
const bcrypt = require('bcrypt');

async function getRegistrationInfo(creds) {
  const {id} = creds;
  const result = await db.query(
    `select * from user inner join patient on user.id = patient.user_id where user.id = '${id}'`
  );

  if (!result) {
  throw new Error("User not found");
  }

  return {result}
}

async function fillRegisterInfo(creds){
 const {id,name,type,dob,gender,phone,address,postalcode,avatar_url,email, password, blood_group} = creds;
 const hashedpassword = await bcrypt.hash(password,7);
  const result = await db.query(
    `Insert into user values('${id}','${email}','${hashedpassword}','${name}','${type}','${phone}','${dob}','${gender}','${address}','${postalcode}','${avatar_url}')`
  );
  const result1 = await db.query(
    `insert into patient values('${id}','${blood_group}')`
  )
  if (!result && !result1) {
      throw new Error("User not found");
  }
  return {result, result1, email}
  
}

module.exports = {
    getRegistrationInfo,
    fillRegisterInfo
  }