const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
    DISNAME: {
        type: String,
        required: true
    },
    DID: {
        type: String,
        required: true
    },
    LVL: {
        type: String,
        required: true
    },
    AVATAR: {
        type: Array,
        required: true
    },
    CURRENT_WORLD: {
        type: Array,
        required: true
    },
    CURRENT_ZONE: {
        type: Array,
        required: true
    },
    SPECTER: {
        type: String,
        required: true
    },
    CARDS: {
        type: Array,
        required: false
    },
    EQUIPPED_RANK: {
        type: String,
        required: true
    },
    RANKS: {
        type: Array,
        required: true
    },
    MOVES: {
        type: Array,
        required: true
    },
    GUILD: {
        type: String,
        required: true
    },
    CLASS: {
        type: String,
        required: true
    },
    MORALITY: {
        type: String,
        required: true
    },
    USED_CODES: {
        type: Array,
        required: true
    },
    COMPLETED_QUESTS: {
        type: Array,
        required: true
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now
    },
    IS_ADMIN: {
        type: Boolean,
        required: true,
        default: false
    }
});

const collection = "PLAYERS"

module.exports = User = mongoose.model("players", PlayerSchema, collection);