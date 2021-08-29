// TODO don`t use var
var ObjectId = require('mongodb').ObjectID;

const Movie = require('../models/movies');

class MoviesRepository {

    constructor() { }

    async addMovies(movie_items) {
        const movieDoc = await new Movie(movie_items).save();
        return movieDoc;
    }

    async deleteMovies(movie_id) {
        const item = await Movie.deleteOne({ _id: ObjectId(movie_id) })
        return true;
    }

    async getMovies() {
        const fullItems = await Movie.find().populate("stars", ["fullname"]);
        return fullItems;
    }

    async getMoviesById(movie_id) {
        if (String(movie_id).length != 24) return null;
        const item = await Movie.findOne({ _id: ObjectId(movie_id) }).populate("stars", ["fullname"]);
        return item;
    }
};

module.exports = MoviesRepository;
