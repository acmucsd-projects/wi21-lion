const express = require('express');
const router = express.Router();
const userAuth = require('../middleware/userAuth');
const { StudentOrganization } = require('../models/StudentOrganization');

router.get('/', async function(req, res, next) {
    try {
        const organizations = await StudentOrganization.find({});
        return res.status(200).json({organizations : organizations});
    } catch(err) {
        console.log(err.message);
        return res.status(401).json({error : "Could not retrieve student organizations"});
    }
});

router.post('/', userAuth.authenticateUser, async function(req, res, next) {
    try {
        const { name } = req.body;
        if(!name) {
            return res.status(401).json({error : "Name of the organization is required."});
        }
        const newOrg = new StudentOrganization(req.body);
        await newOrg.save();
        return res.status(200).json(newOrg);
    } catch(err) {
        console.log(err.message);
        return res.status(400).json({error : "Failed to post new student organization"});
    }
});

router.patch('/:org_id', userAuth.authenticateUser, async function(req, res, next) {
    try {
        const updateOrg = await StudentOrganization.findByIdAndUpdate(req.params.org_id, req.body);
        return res.status(200).json(updateOrg);
    } catch(err) {
        console.log(err.message);
        return res.status(401).json({error : "Failed to update org"});
    }
}); 

router.get('/:org_id', async function(req, res, next) {
    try {
        const organization = await StudentOrganization.findById(req.params.org_id);
        return res.status(200).json(organization);
    } catch(err) {
        console.log(err.message);
        return res.status(401).json({error : "Could not retrieve student organizations"});
    }
});

module.exports = router;