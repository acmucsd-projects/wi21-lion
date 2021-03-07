const express = require('express');
const Class = require('../models/Class');
const Department = require('../models/Department');
const router = express.Router();
const userAuth = require('../middleware/userAuth');
const StudentOrganization = require('../models/StudentOrganization');

router.get('/', function(req, res, next) {
    try {
        const organizations = StudentOrganization.find({});
        return res.status(200).json({organizations : organizations});
    } catch(err) {
        return res.status(401).json({error : "Could not retrieve student organizations"});
    }
})

router.post('/', userAuth.authenticateUser,function(req, res, next) {
    try {
        const { name } = req.body;
        if(!name) {
            return res.status(401).json({error : "Name of the organization is required."});
        }
        const newOrg = new StudentOrganization(req.body);
        newOrg.save();
        return res.status(200).json(newOrg);
    } catch(err) {
        return res.status(400).json({error : "Failed to post new student organization"});
    }
});

router.patch('/:org_id', userAuth.authenticateUser, function(req, res, next) {
    try {
        const updateOrg = StudentOrganization.findByIdAndUpdate(req.params.org_id, req.body);
        return res.status(200).json(updateOrg);
    } catch(err) {
        return res.status(401).json({error : "Failed to update org"});
    }
}); 