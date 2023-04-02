var express = require('express');
var router = express.Router();
const user = require('../services/doctorRegistration');


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
        const userEmail = await user.fillRegisterInfo(req.body);
        if (userEmail!=null){
            client.send({
                to: {
                    email: userEmail.email
                },
                from: {
                    email: process.env.MY_EMAIL
                },
                templateId: 'd-6d25d2cb3e0440128ed1c2ef0efdacbb'
            }).then(() => {
                console.log("Email was sent");
            });
        }
    }
    catch(err){
        console.error('Wrong Credentials', err.message);
        next(err);
    }
});

module.exports = router;