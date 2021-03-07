const express = require('express');
const Class = require('../models/Class');
const Department = require('../models/Department');
const router = express.Router();
const userAuth = require('../middleware/userAuth');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
    try {
        const { name } = req.body
        const dep = new Department({ name : name });
        dep.save();
        return res.status(200).json({department : department});
    }
    catch (err) {
        return res.status(401).json({error : "Failed to make new department."})
    }
});

router.get('/', function(req, res, next) {
    try {
        return res.status(200).json({departments : Department.find({})});
    }
    catch (err) {
        return res.status(401).json({error : "Failed to retrieve departments."})
    }
});


module.exports = router;
