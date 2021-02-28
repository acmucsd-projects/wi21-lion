const mongoose = require('mongoose');
const Section = require('./Section');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: String
    },
    sections: {
        type: Section
    },
    previous_sections: {
        type: Section
    }
});

modules.export = mongoose.model('Class', ClassSchema);