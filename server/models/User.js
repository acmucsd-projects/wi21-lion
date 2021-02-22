const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    classes: {
        type: [
            {type: Schema.Types.ObjectId, ref: 'EnrolledSection'}
        ],
        default: []
    },
    previous_classes: {
        type: [
            {type: Schema.Types.ObjectId, ref: 'EnrolledSection'}
        ],
        default: []
    }
});

modules.export = mongoose.model('User', UserSchema);