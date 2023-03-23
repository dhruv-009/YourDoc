// const db = require('./db');
// const helper = require('../helper');
// const config = require('../dbconfig');
// const bcrypt = require('bcrypt');

// async function getById(creds) {
//     const {email} = creds;
//     const result = await db.query(
//       `SELECT name, type, email, password, dob, address, latlong, blood_group
//     FROM user inner join patient on user.id = patient.user_id where user.email='${email}'`
//     );
//     if (!result) {
//         throw new Error("User not found");
//     }
//     return {result}
//   }

// async function patientInfo(creds){
//     const {email, password} = creds;
//     const result = await db.query(
//         `SELECT * FROM user where email='${email}'`
//     );
//     if (result.length > 0) {
//       const result1 = await bcrypt.compare(password, result[0].password);
//       if (!result1) {
//         throw new Error("Password Not Matched");
//       }
//     }
//     if (!result || result.length == 0) {
//         throw new Error("User not found");
//     }
//     return {result}
    
// }

// module.exports = {
//     getById,
//     patientInfo
//   }



const db = require('./db');
const helper = require('../helper');
const config = require('../dbconfig');
const bcrypt = require('bcrypt');

// async function getById(creds) {
//   const { email } = creds;
//   const result = await db.query(
//     `SELECT name, type, email, password, dob, address, latlong, blood_group
//     FROM user inner join patient on user.id = patient.user_id where user.email='${email}'`
//   );
//   let message = 'User not found!';
//   if (result) {
//     message = 'User found successfully';
//   }
//   return { result }
// }

async function getById(creds) {
  const { email } = creds;
  const result = await db.query(
    `SELECT name, type, email, password, dob, address, latlong, blood_group
    FROM user inner join patient on user.id = patient.user_id where user.email='${email}'`
  );
  let message = 'User not found!';
  if (result.length) {
    message = 'User found successfully';
  }
  return { result, message };
}


async function patientInfo(creds) {
  const { email, password } = creds;
  const rows = await db.query(
    `SELECT * FROM user u, patient p where u.id=p.user_id and u.email='${email}'`
  );
  const [data] = helper.emptyOrRows(rows);

  if (data) {
    const isPasswordCorrect = await bcrypt.compare(password, data.password);
    if (isPasswordCorrect) {
      return { data, message: 'success' }
    }
  }

  return { message: 'Wrong email/password' }

}

// async function patientInfo(creds) {
//   const { email, password } = creds;
//   const rows = await db.query(
//     `SELECT * FROM user u, patient p where u.id=p.user_id and u.email='${email}'`
//   );
//   const [data] = helper.emptyOrRows(rows);

//   if (!data) {
//     return { message: 'Wrong email/password' };
//   }

//   const isPasswordCorrect = await bcrypt.compare(password, data.password);
//   if (isPasswordCorrect) {
//     return { data, message: 'success' };
//   } else {
//     return { message: 'Wrong email/password' };
//   }
// }


module.exports = {
  getById,
  patientInfo
}