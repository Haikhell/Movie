const mongoose = require('mongoose');

const starSchema = new mongoose.Schema({
    fullname: { type: String, required: false },

}, { collection: 'stars' });

module.exports = mongoose.model('Star', starSchema);