var express = require('express');
var router = express.Router();
const admin = require('../services/adminlogin');


router.get('/', async function (req, res, next) {
    try {
        res.json(await admin.getById());
    } catch (err) {
        console.error(`Error while getting doctor details `, err.message);
        next(err);
    }
});


router.post('/', async function(req,res,next){
    try{
        res.json(await admin.adminInfo(req.body));
    }
    catch(err){
        console.error('Wrong Credentials', err.message);
        next(err);
    }
});

module.exports = router;