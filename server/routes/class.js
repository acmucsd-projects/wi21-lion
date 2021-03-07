const express = require('express');
const Class = require('../models/Class');
const Department = require('../models/Department');
const router = express.Router();
const userAuth = require('../middleware/userAuth');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:dep', function(req, res, next) {
    try {
        const department_name = req.params.dep;
        const department = Department.findOne({name : department_name});
        return res.status(200).json({classes : department.classes})
    } catch(err) {
        return res.status(401).json({error : "Failed to retrieve classes"});
    }
});

router.post('/:dep', userAuth.authenticateUser, function(req, res, next) {
    try {
        const { name, description, image } = req.body
        if(!name){
            return res.status(400).json({error : "Must provide name of class."});
        }
        const department = Department.findById(req.params.dep);
        const newClass = new Class({name : name, description : description, image : image});
        newClass.save();
        department.classes.append(newClass._id);
        return res.status(200).json(newClass);
    } catch(err) {
        return res.status(401).json({error : "Failed to add class."});
    }
});

router.patch('/:class_id', userAuth.authenticateUser, function(req, res, next) {
    try {
        const updateClass = Class.findByIdAndUpdate(req.params.class_id, req.body);
        return res.status(200).json(updateClass);
    } catch(err) {
        return res.status(401).json({error : "Failed to update class."});
    }
});

module.exports = router;