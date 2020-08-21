const mongoose = require('mongoose');

const subscribeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    subscribeChannel: {
        type: String,
        required: true
    },

    subscribeData: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('subscriber', subscribeSchema);