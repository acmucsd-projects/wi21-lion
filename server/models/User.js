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
        required: true
    }]
});

UserSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
})

UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);