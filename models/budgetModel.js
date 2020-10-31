const mongoose = require('mongoose');

const schema = mongoose.Schema({
    id: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true,
        match: [/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'Invalid Color']
    }
}, {collection: 'personal_Budget'})

const model = mongoose.model('task', schema);
module.exports = model;