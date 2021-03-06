const express = require('express');
const { Class } = require('../models/Class');
const { Department } = require('../models/Department');
const router = express.Router();
const userAuth = require('../middleware/userAuth');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/departments', function(req, res, next) {
    try {
        return res.status(200).json({departments : Department.find({})});
    }
    catch (err) {
        return res.status(401).json({error : "Failed to retrieve departments."})
    }
});

router.get('/department/classes', function(req, res, next) {
    try {
        const { department_name } = res.body;
        const department = Department.findOne({name : department_name});
        return res.status(200).json({classes : department.classes})
    } catch(err) {
        return res.status(401).json({error : "Failed to retrieve classes"});
    }
})