const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ReleaseYear: { type: Number, default: Number(1997) },
    format: { type: String, required: true },
    stars: [{ type: mongoose.Types.ObjectId, ref: 'Star' }],
}, { collection: 'movies' });

module.exports = mongoose.model('Movie', movieSchema);