const mongoose = require('mongoose');
const Class = require('./Class');
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    classes: [{
        type: Schema.Types.ObjectId,
        ref: "Classes",
    }]
});

const Department = mongoose.model('Department', DepartmentSchema);
module.exports = {
    Department
};
