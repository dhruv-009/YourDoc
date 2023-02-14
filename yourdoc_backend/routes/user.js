var express = require('express');
var router = express.Router();
const user = require('../services/user');

router.get('/', async function (req, res, next) {
  try {
    res.json(await user.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    res.json(await user.getById(req.params.id));
  } catch (err) {
    console.error(`Error while getting user `, err.message);
    next(err);
  }
});

router.post('/', async function (req, res, next) {
  try {
    res.json(await user.create(req.body));
  } catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
});

module.exports = router;
