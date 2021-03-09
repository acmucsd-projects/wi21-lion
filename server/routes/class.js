const express = require('express');
const { Class } = require('../models/Class');
const { Department } = require('../models/Department');
const router = express.Router();
const userAuth = require('../middleware/userAuth');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/:dep', userAuth.authenticateUser, async function(req, res, next) {
    try {
        const { name, description, image } = req.body
        if(!name){
            return res.status(400).json({error : "Must provide name of class."});
        }
        const department_name = req.params.dep;
        const department = await Department.findOne({name : department_name});
        const newClass = new Class({name : name, description : description, image : image});
        await department.classes.push(newClass._id);
        await newClass.save();
        await department.save()
        return res.status(200).json(newClass);
    } catch(err) {
        console.log(err.message);
        return res.status(401).json({error : "Failed to add class."});
    }
});

router.patch('/:class_id', userAuth.authenticateUser, async function(req, res, next) {
    try {
        const updateClass = await Class.findByIdAndUpdate(req.params.class_id, req.body);
        return res.status(200).json(updateClass);
    } catch(err) {
        console.log(err.message);
        return res.status(401).json({error : "Failed to update class."});
    }
});

router.get('/:class_id', async function(req, res, next) {
    try {
        const getClass = await Class.findById(req.params.class_id);
        return res.status(200).json({getClass});
    } catch(err) {
        console.log(err.message);
        return res.status(401).json({error : "Failed to retrieve class"});
    }
});

module.exports = router;