const express = require('express');
const { User } = require('../models/User');
const router = express.Router();
const userAuth = require('../middleware/userAuth');
const { EnrolledSection } = require('../models/EnrolledSection');

/**
 * @api {post} /enroll/:section_id Enroll is a specific section
 * 
 * @apiParam {ObjectId} section_id The id of the section the user is enrolling in.
 *
 * @apiSuccess (Success 200) { _id, section_id, lecture_zoom, discussion_zoom, lab_zoom, oh_zoom, piazza, gradescope } EnrolledSection information.
 * @apiError { error } 400/Bad Request.
 */
router.post('/:section_id', userAuth.authenticateUser, async function(req, res, next){
    try {
        console.log("POST request");
        const { user_email } = req;
        const user = await User.findOne({email : user_email});
        const newEnrolledSection = new EnrolledSection({section_id : req.params.section_id});
        await user.enrolled_sections.push(newEnrolledSection._id);
        await newEnrolledSection.save();
        await user.save();
        return res.status(200).json(newEnrolledSection);
    }
    catch (err) {
        console.log(err.message);
        return res.status(400).json({error : "Could not enroll in section."});
    }
});

router.get('/', userAuth.authenticateUser, async function(req, res, next) {
    try {
        const { user_email } = req;
        const user = await User.findOne({email : user_email}).populate('enrolled_sections');
        return res.status(200).json({enrolled_sections : user.enrolled_sections});
    } catch(err) {
        console.log(err.message);
        return res.status(400).json({error : "Could not retrieve user's enrolled sections."});
    }
})

router.get('/:enrolled_id', userAuth.authenticateUser, async function(req, res, next) {
    try {
        const enrolledSection = await EnrolledSection.findById(req.params.enrolled_id);
        return res.status(200).json(enrolledSection);
    } catch(err) {
        console.log(err.message);
        return res.status(400).json({error : "Could not retrieve enrolled section."});
    }
})

router.patch('/:enrolled_id', userAuth.authenticateUser, async function(req, res, next) {
    try {
        const updateEnrolled = await EnrolledSection.findByIdAndUpdate(req.params.enrolled_id, req.body);
        return res.status(200).json({message : "Updated section."});
    } catch (err) {
        console.log(err.message);
        return res.status(401).json({error : "Could not edit enrolled section."});
    }
});

router.delete('/:enrolled_id', userAuth.authenticateUser, async function(req, res, next) {
    try {
        const { user_email } = req;
        const enrolled_id = req.params.enrolled_id;
        await User.findOneAndUpdate({ email : user_email }, { $pull : { enrolled_sections : enrolled_id }});
        await EnrolledSection.deleteOne({ _id : enrolled_id });
        return res.status(200).json({message : "Successfully unenrolled from section."});
    } catch (err) {
        console.log(err.message);
        return res.status(401).json({error : "Failed to unenroll from class."});
    }
});

module.exports = router;