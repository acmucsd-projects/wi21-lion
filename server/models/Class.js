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
    sections: [{
        type: Schema.Types.ObjectId
    }],
    previous_sections: {
        type: Schema.Types.ObjectId
    }
});

modules.export = mongoose.model('Class', ClassSchema);