const express = require('express');
const { Department } = require('../models/Department');
const router = express.Router();
const userAuth = require('../middleware/userAuth');

router.post('/', userAuth.authenticateUser, async function(req, res, next) {
    try {
        const { name } = req.body
        const dep = new Department({ name : name });
        await dep.save();
        return res.status(200).json({department : dep});
    }
    catch (err) {
        console.log(err.message);
        return res.status(401).json({error : "Failed to make new department."})
    }
});

router.get('/', async function(req, res, next) {
    try {
        return res.status(200).json({departments : await Department.find({})});
    }
    catch (err) {
        console.log(err.message);
        return res.status(401).json({error : "Failed to retrieve departments."})
    }
});

router.get('/:dep', async function(req, res, next) {
    try {
        const department_name = req.params.dep;
        const department = await Department.findOne({name : department_name});
        return res.status(200).json({classes : department.classes})
    } catch(err) {
        console.log(err.message);
        return res.status(401).json({error : "Failed to retrieve classes"});
    }
});


module.exports = router;
