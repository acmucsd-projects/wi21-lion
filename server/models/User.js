const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const EnrolledSection = require('./EnrolledSection');
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
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    enrolled_sections: [{
        section: {
            type: Schema.Types.ObjectId,
            required: true
        },
        lecture_zoom: {
            type: String,
            default: ""
        },
        discussion_zoom: {
            type: String,
            default: ""
        },
        lab_zoom: {
            type: String,
            default: ""
        },
        oh_zoom: {
            type: String,
            default: ""
        },
        piazza: {
            type: String,
            default: ""
        },
        gradescope: {
            type: String,
            default: ""
        }
    }]
});

UserSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
})

UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.export = mongoose.model('User', UserSchema);