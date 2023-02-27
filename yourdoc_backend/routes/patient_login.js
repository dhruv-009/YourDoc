var express = require('express');
var router = express.Router();
// const jwt = require("jsonwebtoken");
const user = require('../services/patient_login');

router.get('/', async function (req, res, next) {
    try {
        res.json(await user.getById(req.body));
    } catch (err) {
        console.error(`Error while getting patient `, err.message);
        next(err);
    }
});

// const token = jwt.sign(user, process.env.MY_SECRET, { expiresIn: "1h"});

// res.cookie("token", token, {
//     httpOnly: true
// })
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