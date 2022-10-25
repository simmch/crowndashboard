const mongoose = require("mongoose");

const GuildSchema = new mongoose.Schema({
    OWNER: {
        type: String,
        required: true
    },
    NAME: {
        type: String,
        required: true
    },
    MEMBERS: {
        type: Array,
        required: true
    },
    TOURNAMENT_WINS: {
        type: Number,
        required: true
    },
    SCRIM_WINS: {
        type: Number,
        required: true
    },
    LOGO_URL: {
        type: String,
        required: true
    },
    BADGES: {
        type: Array,
        required: true
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now
    }
});

const collection = "GUILDS"

module.exports = Guild = mongoose.model("guild", TeamSchema, collection);