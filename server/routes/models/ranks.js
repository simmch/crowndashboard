const mongoose = require("mongoose");

const RankSchema = new mongoose.Schema({
    RANK_CODE: {
        type: String,
        required: false
    },
    TITLE: {
        type: String,
        required: false
    },
    WORLD: {
        type: String,
        required: false
    },
    BUFF: {
        type: Array,
        required: false
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now
    },
    REQUIRED_MORALITY: {
        type: Number,
        required: false
    },
});

const collection = "ranks"

module.exports = Rank = mongoose.model("rank", RankSchema, collection);