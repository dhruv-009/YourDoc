// imports
var express = require('express');
var router = express.Router();
const user = require('../services/login');

// logic

router.get('/', async function (req, res, next) {
    try {
        res.json(await user.getById(req.body));
    } catch (err) {
        console.error(`Error while getting patient `, err.message);
        next(err);
    }
});


router.post('/', async function(req,res,next){
    try{
        res.json(await user.patientInfo(req.body));
    }
    catch(err){
        console.error('Wrong Credentials', err.message);
        next(err);
    }
});

module.exports = router;
// check cookiee for user info
// if data found -> get data and render next page
// if not then authenticate user