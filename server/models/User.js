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
        unique : true
    },
    password: {
        type: String,
        required: true
    },
    enrolled_sections: [{
        type: Schema.Types.ObjectId,
        ref: 'EnrolledSection',
    }]
});

UserSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync());
})

UserSchema.methods.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = {
    User
}