const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SectionSchema = new Schema({
    class: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
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
    professor: {
        type: String,
        required: true
    },
    section_id: {
        type: String,
        required: true
    }
});

modules.export = mongoose.model('Section', SectionSchema);