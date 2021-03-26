const express = require('express');
const { Class } = require('../models/Class');
const { Department } = require('../models/Department');
const router = express.Router();
const userAuth = require('../middleware/userAuth');

/**
 * @api {get} /class/ Retrieve list of all classes.
 * 
 * @apiSuccess (Success 200) { classes } List of classes.
 * @apiError { error } 400/Bad Request.
 */
router.get('/', async function(req, res, next) {
    try {
        const classes = await Class.find({});
        return res.status(200).json({classes : classes});
    } catch(err) {
        console.log(err.message);
        return res.status(400).json({error : "Failed to retrieve classes"});
    }
});

/**
 * @api {post} /class/:dep Create a new class
 * 
 * @apiParam {String} dep The name of the department the class falls under.
 *
 * @apiSuccess (Success 200) { name, description, image, sections } Class information
 * @apiError { error } 400/Bad Request.
 */
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
        return res.status(400).json({error : "Failed to add class."});
    }
});

/**
 * @api {patch} /class/:class_id Modify a class
 * 
 * @apiParam {ObjectId} class_id The id of the class to be modified.
 *
 * @apiSuccess (Success 200) { message } Success message.
 * @apiError { error } 400/Bad Request.
 */
router.patch('/:class_id', userAuth.authenticateUser, async function(req, res, next) {
    try {
        const updateClass = await Class.findByIdAndUpdate(req.params.class_id, req.body);
        return res.status(200).json({message : "Updated class."});
    } catch(err) {
        console.log(err.message);
        return res.status(400).json({error : "Failed to update class."});
    }
});

/**
 * @api {get} /class/:class_id Retrieve a class
 * 
 * @apiParam {ObjectId} class_id The id of the class to be retrieved.
 *
 * @apiSuccess (Success 200) { name, description, image, sections } Class information
 * @apiError { error } 400/Bad Request.
 */
router.get('/:class_id', async function(req, res, next) {
    try {
        const getClass = await Class.findById(req.params.class_id);
        return res.status(200).json(getClass);
    } catch(err) {
        console.log(err.message);
        return res.status(400).json({error : "Failed to retrieve class"});
    }
});

module.exports = router;