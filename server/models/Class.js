const mongoose = require('mongoose');
const Section = require('./Section');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
});

module.exports = mongoose.model('Class', ClassSchema);