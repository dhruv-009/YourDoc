var express = require('express');
var router = express.Router();
const user = require('../services/patientRegistration');


router.get('/', async function (req, res, next) {
    try {
        res.json(await user.getRegistrationInfo(req.body));
    } catch (err) {
        console.error(`Error while getting user info`, err.message);
        next(err);
    }
});


router.post('/', async function(req,res,next){
    try{
        res.json(await user.fillRegisterInfo(req.body));
    }
    catch(err){
        console.error('Wrong Credentials', err.message);
        next(err);
    }
});

module.exports = router;