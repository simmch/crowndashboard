const mongoose = require("mongoose");

const RankSchema = new mongoose.Schema({
    RANK_CODE: {
        type: String,
        required: true
    },
    TITLE: {
        type: String,
        required: true
    },
    WORLD: {
        type: String,
        required: true
    },
    BUFF: {
        type: Array,
        required: true
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now
    },
    REQUIRED_MORALITY: {
        type: Number,
        required: true
    },
});

const collection = "RANK"

module.exports = Rank = mongoose.model("rank", RankSchema, collection);