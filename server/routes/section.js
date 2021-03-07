const express = require('express');
const { User } = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const userAuth = require('../middleware/userAuth');
const Section = require('../models/Section');
const Class = require('../models/Class');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/:class_id', userAuth.authenticateUser, function(req, res, next) {
    try {
        const { class_id, quarter, year, professor, section_id } = req.body;
        const sectionExists = Section.exists({ class_id : class_id, quarter : quarter, year : year, professor : professor, section_id : section_id});
        if(sectionExists){
            return res.status(401).json({error : "Section already exists."})
        }
        const cls = Class.findById(class_id);
        const newSection = new Section(req.body);
        newSection.save();
        cls.sections.append(newSection._id);
        return res.status(200).json(newSection);
    } catch (err) {
        return res.status(400).json({error : "Failed to add new section"});
    }
});

router.patch('/:section_id', userAuth.authenticateUser, function(req, res, next) {
    try {
        const updateSection = Section.findByIdAndUpdate(req.params.section_id, req.body);
        return res.status(200).json(updateSection);
    } catch (err) {
        return res.status(400).json({error : "Failed to update section"});
    }
})

router.get('/:class_id/:year/:quarter', function(req, res, next) {
    try {
        const year = req.params.year;
        const quarter = req.params.quarter;
        const class_id = req.params.class_id;
        return res.status(200).json(Section.find({class_id : class_id, year : year, quarter : quarter}));
    } catch(err) {
        return res.status(401).json({error : "Failed to retrieve class sections"});
    }
});


module.exports = router;