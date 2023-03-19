var express = require('express');
var router = express.Router();
const availability = require('../services/availability');

router.get('/', async function (req, res, next) {
  const { doctor_id } = req.query;
  try {
    res.json(await availability.getByDoctorId(doctor_id));
  } catch (err) {
    console.error(`Error while getting availability `, err.message);
    next(err);
  }
});

router.post('/', async function (req, res, next) {
  const { doctor_id, availabilities } = req.body;
  try {
    const createdAvailabilities = [];
    const result = new Promise((res, rej) => {
      availabilities.forEach(async a => {
        createdAvailabilities.push(await availability.create({ ...a, doctor_id }))
      })
    })
    result.then(() => {
      res.json(createdAvailabilities);
    })
  } catch (err) {
    console.error(`Error while creating availability`, err.message);
    next(err);
  }
});

module.exports = router;