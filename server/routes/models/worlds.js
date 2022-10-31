const mongoose = require("mongoose");

const WorldSchema = new mongoose.Schema({
    TITLE: {
        type: String,
        required: false
    },
    IMAGE_PATH: {
        type: String,
        required: false
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now
    },
    AVAILABLE: {
        type: Number,
        required: false
    },

});

const collection = "worlds"

module.exports = World = mongoose.model("world", WorldSchema, collection);