const db = require('./db');
const helper = require('../helper');
const config = require('../dbconfig');
var nodemailer = require('nodemailer');

async function getDoctors(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        'SELECT * FROM user WHERE type = "doctor" AND is_approved = false'
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function approveDoctor(userId) {
    const update = await db.query(
        `UPDATE user SET is_approved = true WHERE id="${userId}"`
      );

      let message = 'Error in Updating Doctor';

      if (update.affectedRows) {
        message = 'Doctor Registeration Sucessfull!';
      }
      const data = helper.emptyOrRows(update);
    
      return {
        message, data
      };
}

async function rejectDoctor(userId) {
    const update = await db.query(
        `DELETE FROM user WHERE id="${userId}"`
      );

      let message = 'Error in Removing Doctor';

      if (update.affectedRows) {
        message = 'Doctor Rejected Sucessfull!';
      }
      const data = helper.emptyOrRows(update);
    
      return {
        message, data
      };
}



module.exports = {
    getDoctors,
    approveDoctor,
    rejectDoctor
  }