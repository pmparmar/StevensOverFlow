const express = require('express');
const router = express.Router();
const data = require('../data/');
let validator = require('validator');


router.get('/',(req, res)=>{
	res.render('signup.handlebars',{
		error: false
	});
});

router.post('/',(req,res)=>{
    let reqBody = req.body;
    let email;
    if(validator.isEmail(reqBody.email) && validator.isEmpty(reqBody.email)!=0){
        //console.log();
        email = reqBody.email;
    }else{
        console.log("Please provide your stevens email");
    }
    if(validator.isEmpty(reqBody.fname) || validator.isEmpty(reqBody.lname) || validator.isEmpty(reqBody.password)){
        console.log("Please provide a valid input");
    }else{
        //data call goes here
        //data.addUser(reqBody.fname+" "+reqBody.lname,reqBody.password,email);
    }
});

module.exports = router;