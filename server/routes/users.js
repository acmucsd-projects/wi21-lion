const express = require('express');
const { User } = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const userAuth = require('../middleware/userAuth');
const EnrolledSection = require('../models/EnrolledSection');

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
      return res.status(400).json({ error : 'Could not add user to database.'})
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


router.put('/changePassword', userAuth.authenticateUser, function(req, res, next) {
  try {
    const { user_email } = res;
    const { new_password } = res.body;
    const user = User.findOne({email : user_email});
    user.password = new_password;
    user.save()
    return res.status(200).json({user : user});
  } catch (err) {
    return res.status(401).json({error : "Could not change password."});
  }
});

router.post('/enrolled_sections/:section_id', userAuth.authenticateUser, function(req, res, next){
  try {
    const { user_email } = res;
    const user = User.findOne({email : user_email});
    const newEnrolledSection = new EnrolledSection({section_id : req.params.section_id});
    user.enrolled_sections.append(newEnrolledSection._id);
    return res.status(200).json({ user : user});
  }
  catch (err) {
    return res.status(401).json({error : "Could not enroll in section."});
  }
});

router.get('/enrolled_sections', userAuth.authenticateUser, function(req, res, next) {
  try {
    const { user_email } = res;
    const user = User.findOne({email : user_email});
    return res.status(200).json({enrolled_sections : user.enrolled_sections});
  } catch(err) {
    return res.status(400).json({error : "Could not retrieve user's enrolled sections"});
  }
})

router.get('/enrolled_sections/:enrolled_id', userAuth.authenticateUser, function(req, res, next) {
  try {
    const enrolledSection = EnrolledSection.findById(req.params.enrolled_id);
    return res.status(200).json(enrolledSection);
  } catch(err) {
    return res.status(400).json({error : "Could not retrieve user's enrolled sections"});
  }
})

router.patch('/enrolled_sections/:enrolled_id', userAuth.authenticateUser, function(req, res, next) {
  try {
    const updateEnrolled = EnrolledSection.findByIdAndUpdate(req.params.enrolled_id, req.body);
    return res.status(200).json(updateEnrolled);
  } catch (err) {
    return res.status(401).json({error : "Could not edit enrolled section."});
  }
});

// add deleting enrolled section

module.exports = router;
