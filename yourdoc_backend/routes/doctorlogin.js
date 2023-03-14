const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const user = require('../services/doctorlogin');



router.get('/', authenticateToken, async function (req, res, next) {
    try {
        res.json(await user.getById(req.body));
    } catch (err) {
        console.error(`Error while getting doctor `, err.message);
        next(err);
    }
});


router.post('/', async function(req, res, next) {
    try {
      const patient = await user.doctorInfo(req.body);
      if (patient == null) {
        return res.status(400).send('Wrong credentials');
      }
      const accessToken = jwt.sign(patient, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
      console.log(accessToken);
      res.json({ accessToken: accessToken });
    } catch (err) {
      console.error('Error while authenticating patient', err.message);
      next(err);
    }
  });

  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, patient) => {
      if (err) return res.sendStatus(403);
      req.patient = patient;
      next();
    });
  }
module.exports = router;