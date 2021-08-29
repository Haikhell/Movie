// TODO don`t use var
var ObjectId = require('mongodb').ObjectID;

const Star = require('../models/stars');

class StarsRepository {

    constructor() { }

    async addStars(star_items) {
        const starDoc = await new Star(star_items).save();
        return starDoc;
    }

    async getStarsByName(name) {
        if (name.length == 0) return null;
        const item = await Star.findOne({ fullname: name })
        return item;
    }
};

module.exports = StarsRepository;
