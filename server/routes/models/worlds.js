const mongoose = require("mongoose");

const WorldSchema = new mongoose.Schema({
    TITLE: {
        type: String,
        required: true
    },
    IMAGE_PATH: {
        type: String,
        required: true
    },
    ZONES: {
        type: Array,
    },
    RANKS: {
        type: Array,
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now
    },
    AVAILABLE: {
        type: Number,
        required: true
    },

});

const collection = "WORLD"

module.exports = World = mongoose.model("world", WorldSchema, collection);