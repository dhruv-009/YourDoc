var express = require('express');
var router = express.Router();
const doctor = require('../services/doctorlogin');


router.get('/', async function (req, res, next) {
    try {
        res.json(await doctor.getById(req.body));
    } catch (err) {
        console.error(`Error while getting doctor details `, err.message);
        next(err);
    }
});


router.post('/', async function(req,res,next){
    try{
        res.json(await doctor.doctorInfo(req.body));
    }
    catch(err){
        console.error('Wrong Credentials', err.message);
        next(err);
    }
});

module.exports = router;