const express = require('express');
const { User } = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const userAuth = require('../middleware/userAuth');
const { EnrolledSection } = require('../models/EnrolledSection');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async function(req, res, next) {
  const user = req.body;
  const { first_name, last_name, email, password } = user;
  if(!first_name || !last_name || !email || !password){
    return res.status(400).json({ error : 'Invalid input.'});
  } else {
    try {
      const user_entry = new User(user);
      await user_entry.save();
      return res.status(200).json({ user : user_entry });
    } catch(err) {
      console.log(err.message);
      return res.status(409).json({ error : "Could not add user to database."});
    }
  }
});

router.get('/login', async function(req, res, next) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email : email });
    if(!user){
      return res.status(401).json({ error : "Wrong email provided."});
    } else {
      if (await user.validatePassword(password)){
        const jwt_token = jwt.sign({email : email}, config.authentication.JWT_SECRET, {expiresIn : '2hr'});
        return res.status(200).json({ user : user, email : email, token : jwt_token})
      } else {
        return res.status(401).json({ error : "Invalid credentials"});
      }
    }
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ error : "Unable to login"});
  }
});

router.get('/profile', userAuth.authenticateUser, async function(req, res, next) {
  try {
    const { user_email } = req;
    const user = await User.findOne({email : user_email});
    if(!user){
      return res.status(400).json({error : "User does not exist"});
    } else {
      return res.status(200).json({user : user});
    }
  } catch(err) {
    return res.status(401).json({error : "Error retrieving profile"});
  }
});


router.patch('/changePassword', userAuth.authenticateUser, async function(req, res, next) {
  try {
    const { user_email } = req;
    const { new_password } = req.body;
    const user = await User.findOne({email : user_email});
    user.password = new_password;
    user.save()
    return res.status(200).json({user : user});
  } catch (err) {
    return res.status(401).json({error : "Could not change password."});
  }
});

router.post('/enrolled_sections/:section_id', userAuth.authenticateUser, async function(req, res, next){
  try {
    const { user_email } = req;
    const user = await User.findOne({email : user_email});
    const newEnrolledSection = new EnrolledSection({section_id : req.params.section_id});
    await newEnrolledSection.save();
    await user.enrolled_sections.append(newEnrolledSection._id);
    return res.status(200).json({ user : user});
  }
  catch (err) {
    return res.status(401).json({error : "Could not enroll in section."});
  }
});

router.get('/enrolled_sections', userAuth.authenticateUser, async function(req, res, next) {
  try {
    const { user_email } = req;
    const user = await User.findOne({email : user_email});
    return res.status(200).json({enrolled_sections : user.enrolled_sections});
  } catch(err) {
    return res.status(400).json({error : "Could not retrieve user's enrolled sections"});
  }
})

router.get('/enrolled_sections/:enrolled_id', userAuth.authenticateUser, async function(req, res, next) {
  try {
    const enrolledSection = await EnrolledSection.findById(req.params.enrolled_id);
    return res.status(200).json(enrolledSection);
  } catch(err) {
    return res.status(400).json({error : "Could not retrieve user's enrolled sections"});
  }
})

router.patch('/enrolled_sections/:enrolled_id', userAuth.authenticateUser, async function(req, res, next) {
  try {
    const updateEnrolled = await EnrolledSection.findByIdAndUpdate(req.params.enrolled_id, req.body);
    return res.status(200).json(updateEnrolled);
  } catch (err) {
    return res.status(401).json({error : "Could not edit enrolled section."});
  }
});

// add deleting enrolled section

module.exports = router;
