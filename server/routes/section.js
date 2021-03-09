const express = require('express');
const router = express.Router();
const userAuth = require('../middleware/userAuth');
const { Section } = require('../models/Section');
const { Class } = require('../models/Class');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/:class_id', userAuth.authenticateUser, async function(req, res, next) {
    try {
        const class_id = req.params.class_id;
        req.body.class_id = class_id;
        const { quarter, year, professor, section_id } = req.body;
        const sectionExists = await Section.exists({ class_id : class_id, quarter : quarter, year : year, professor : professor, section_id : section_id});
        if(sectionExists){
            return res.status(401).json({error : "Section already exists."})
        }
        const cls = await Class.findById(class_id);
        const newSection = new Section(req.body);
        await cls.sections.push(newSection._id);
        await newSection.save();
        await cls.save();
        return res.status(200).json(newSection);
    } catch (err) {
        console.log(err.message);
        return res.status(400).json({error : "Failed to add new section"});
    }
});

router.patch('/:section_id', userAuth.authenticateUser, async function(req, res, next) {
    try {
        const updateSection = await Section.findByIdAndUpdate(req.params.section_id, req.body);
        return res.status(200).json(updateSection);
    } catch (err) {
        console.log(err.message);
        return res.status(400).json({error : "Failed to update section"});
    }
});

router.get('/:class_id/:year/:quarter', async function(req, res, next) {
    try {
        const year = req.params.year;
        const quarter = req.params.quarter;
        const class_id = req.params.class_id;
        const sections = await Section.find({class_id : class_id, year : year, quarter : quarter});
        return res.status(200).json({sections : sections});
    } catch(err) {
        console.log(err.message);
        return res.status(401).json({error : "Failed to retrieve class sections"});
    }
});

router.get('/:section_id', async function(req, res, next) {
    try {
        const section = await Section.findById(req.params.section_id);
        return res.status(200).json(section);
    } catch (err) {
        console.log(err.message);
        return res.status(400).json({error : "Failed to retrieve section"});
    }
})


module.exports = router;