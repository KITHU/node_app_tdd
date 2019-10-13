const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const validator = require('validator')

const User = require('../database/models/User')
const formFields = require('../helperMethods/checkRequireFormFields')
const jwt = require('../helperMethods/generatetoken')


const saltRounds = 10;
let salt = bcrypt.genSaltSync(saltRounds);

// this route handles login of a user
router.post('/login',(req, res, next) => {
  let request = req.body
  let fields = ["email","password"];
  
  formFields(fields,request,res)
  if (validator.isEmail(request.email) === false){
    res.status(400).json({
      error: 'email should be a valid email'
    })
  }
  User.findOne({where:{email:request.email}})
    .then(user=>{
      if (user.length < 1){
        res.status(404).json({
        error: "invalid login email"
        })
      }
      if (bcrypt.compareSync(request.password, user.password) === false){
        res.status(404).json({
          error: "invalid login password"
        });
      }
      let data = {
        "id":user.id,
        "email":user.email,
        "firstName":user.firstName,
        "lastNmae":user.lastName
      }
      
      res.status(200).json({
       message:"you are loged in",
       token:jwt(data)
      })
    })
    .catch()
});



// this route handles creation of new user
router.post('/signup',(req, res, next) => {
  let request = req.body
  let fields = ["firstName","lastName","email","password"];
  formFields(fields,request,res)

  if (validator.isEmail(request.email) === false){
    res.status(400).json({
      error: 'email should be a valid email'
    })
  }
  if (validator.isAlphanumeric(request.password) === false || 
     validator.isLength(request.password, 6,12) === false){
    res.status(400).json({
      error: 'password should be Alphanumeric with a min of 6 and max 12 characters '
    })
  }
  if (validator.isAlpha(request.firstName) === false || 
     validator.isLength(request.firstName, 3,20) === false){
    res.status(400).json({
      error: 'firstName should be atleast 3 characters long '
    })
  }
  if (validator.isAlpha(request.lastName) === false || 
     validator.isLength(request.lastName, 3,15) === false){
    res.status(400).json({
      error: 'lastName should be atleast 3 characters long '
    })
  }
  let hash = bcrypt.hashSync(request.password, salt);
  const userDetails = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash
  }

  User.findAll({where:{email:request.email}})
  .then(user=>{
    if (user.length > 0){
      res.status(400).json({
        error:"email is already registered"
      })
    }else{
      User.create(userDetails)
      .then(user=>{
       res.status(201).json({
        message:{
          "id":user.id,
          "Name":user.firstName + user.lastName,
          "email": user.email
      }
       });
      })
    }
  })
  .catch(err => console.log(err))
});


module.exports = router;