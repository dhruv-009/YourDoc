const db = require('./db');
const helper = require('../helper');
const config = require('../dbconfig');
const { v4: uuid } = require('uuid');

async function getByDoctorId(doctorId, page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT name, specialization, datetime, description
      FROM appointment a, user u 
      WHERE a.doctor_id = u.id and u.id = '${doctorId}'
      LIMIT ${offset},${config.listPerPage}
    `
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function getByPatientId(patientId, page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT name, doctor_id, datetime, description
    FROM (SELECT datetime, description, doctor_id
      FROM appointment a, user u
      WHERE a.patient_id = u.id and u.id = '${patientId}') pAppoint, user uu
    WHERE uu.id = pAppoint.doctor_id
    ORDER BY datetime
    LIMIT ${offset},${config.listPerPage}
    `
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function create(appointment) {
  const { patient_id, doctor_id, datetime, description } = appointment;
  const id = uuid();

  const result = await db.query(
    `INSERT INTO appointment
    (id, patient_id, doctor_id, datetime, description)
    VALUES
      ('${id}', '${patient_id}', '${doctor_id}', '${datetime}', '${description ? description : ''}');
    `
  );

  let message = 'Error in creating appointment';

  if (result.affectedRows) {
    message = 'Appointment created successfully';
  }

  return { message, id };
}

module.exports = {
  getByDoctorId,
  getByPatientId,
  create
}