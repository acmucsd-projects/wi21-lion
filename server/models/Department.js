const mongoose = require('mongoose');
const Class = require('./Class');
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
});

modules.export = mongoose.model('Department', DepartmentSchema);