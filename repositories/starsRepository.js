var ObjectId = require('mongodb').ObjectID;

const Star = require('../models/stars');

class StarsRepository {

    constructor() { }

    async addStars(star_items) {
        const starDoc = await new Star(star_items).save();
        return starDoc;
    }

    async deleteStars(star_id) {
        const item = await Star.deleteOne({ _id: ObjectId(star_id) })
        return true;
    }

    async getStars() {
        const items = await Star.find().sort({ created: -1 });
        return items;
    }

    async getStarsByName(name) {
        if (name.length == 0) return null;
        const item = await Star.findOne({ fullname: name })
        return item;
    }
};

module.exports = StarsRepository;