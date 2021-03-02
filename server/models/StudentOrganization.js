const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentOrganizationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    post_date: {
        type: Date,
        default: Date.now()
    },
    description: {
        type: String,
    },
    website: {
        type: String
    },
    picture: {
        type: String
    }
});

modules.export = mongoose.model('StudentOrganization', StudentOrganizationSchema);