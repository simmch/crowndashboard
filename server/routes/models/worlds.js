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
    AVAILABLE: {
        type: Boolean,
        required: false
    },

});

const collection = "worlds"

module.exports = World = mongoose.model("worlds", WorldSchema, collection);