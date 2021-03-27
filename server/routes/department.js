const express = require('express');
const { Department } = require('../models/Department');
const router = express.Router();
const userAuth = require('../middleware/userAuth');

/**
 * @api {post} /department/ Create a new department.
 * 
 * @apiSuccess (Success 200) { name, classes } Department information.
 * @apiError { error } 400/Bad Request.
 */
router.post('/', userAuth.authenticateUser, async function(req, res, next) {
    try {
        const { name } = req.body
        const dep = new Department({ name : name });
        await dep.save();
        return res.status(200).json(dep);
    }
    catch (err) {
        console.log(err.message);
        return res.status(400).json({error : "Failed to make new department."})
    }
});

/**
 * @api {get} /department/ Retrieve a list of departments.
 * 
 * @apiSuccess (Success 200) { name, classes } Department information.
 * @apiError { error } 400/Bad Request.
 */
router.get('/', async function(req, res, next) {
    try {
        return res.status(200).json({departments : await Department.find({})});
    }
    catch (err) {
        console.log(err.message);
        return res.status(400).json({error : "Failed to retrieve departments."})
    }
});

/**
 * @api {get} /department/:dep Create a new class
 * 
 * @apiParam {Integer} dep The name of the department to retrieve.
 *
 * @apiSuccess (Success 200) { name, classes } Department information.
 * @apiError { error } 400/Bad Request.
 */
router.get('/:dep', async function(req, res, next) {
    try {
        const department_name = req.params.dep;
        const department = await Department.findOne({name : department_name});
        return res.status(200).json(department)
    } catch(err) {
        console.log(err.message);
        return res.status(400).json({error : "Failed to retrieve department."});
    }
});


module.exports = router;
