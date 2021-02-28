const express = require('express');
const { User } = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const userAuth = require('../middleware/userAuth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next) {
  const user = req.body;
  const { first_name, last_name, email, password } = user;
  if(!first_name || !last_name || !email || !password){
    return res.status(400).json({ error : 'Invalid input.'});
  } else {
    try {
      user_entry = new User(user);
      user_entry.save();
    } catch(err) {
      return res.status(409).json({ error : 'Could not add user to database.'})
    }
    return res.status(200).json({ user : user_entry });
  }
});

router.get('/login', function(req, res, next) {
  try {
    const { email, password } = req.body
    const user = User.findOne({ email : email });
    if(!user){
      return res.status(401).json({ error : "Invalid credentials"});
    } else {
      if (user.validatePassword(password)){
        const jwt_token = jwt.sign({email : email}, config.authentication.JWT_SECRET, {expiresIn : '2hr'});
        return res.status(200).json({ user : user, email : email, token : jwt_token})
      } else {
        return res.status(401).json({ error : "Invalid credentials"});
      }
    }
  } catch (err) {
    return res.status(401).json({ error : "Invalid credentials"});
  }
});

router.get('/profile', userAuth.authenticateUser, function(req, res, next) {
  try {
    const { user_email } = res;
    const user = User.findOne({email : user_email});
    if(!user){
      return res.status(400).json({error : "User does not exist"});
    } else {
      return res.status(200).json({user : user});
    }
  } catch(err) {
    return res.status(401).json({error : "Invalid user."});
  }
});

/*
router.put('/changePassword', userAuth.authenticateUser, function(req, res, next) {
  try {
    const { user_email } = res;

  } catch (err) {

  }
});*/

module.exports = router;
