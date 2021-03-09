const mongoose = require('mongoose');
const Class = require('./Class');
const Schema = mongoose.Schema;

const SectionSchema = new Schema({
    class_id: {
        type: Schema.Types.ObjectId,
        ref: "Class",
        required: true
    },
    quarter: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    professor: {
        type: String,
        required: true
    },
    section_id: {
        type: String,
        required: true
    },
    canvas: {
        type: String,
    },
    website: {
        type: String,
    },
    discord: {
        type: String,
    },
    lecture_times: {
        type: String,
        required: true
    }
});

const Section = mongoose.model('Section', SectionSchema);
module.exports = {
    Section
};