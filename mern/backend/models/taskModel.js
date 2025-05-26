const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    priority: {
        type: Number
    },
    duedate: {
        type: Date
    }
}, {timestamps: true});


module.exports = mongoose.model('Task', taskSchema)
