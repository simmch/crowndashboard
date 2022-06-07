const mongoose = require("mongoose");

const UniverseSchema = new mongoose.Schema({
    TITLE: {
        type: String,
        required: true
    },
    PATH: {
        type: String,
        required: true
    },
    CROWN_TALES: {
        type: Array,
        required: true
    },
    DUNGEONS: {
        type: Array,
        required: true
    },
    PREREQUISITE: {
        type: String,
        required: true
    },
    UNIVERSE_BOSS: {
        type: String,
        required: true
    },
    CORRUPTED: {
        type: Boolean,
        required: true
    },
    HAS_CROWN_TALES: {
        type: Boolean,
        required: true
    },
    HAS_DUNGEON: {
        type: Boolean,
        required: true
    },
    UTITLE: {
        type: String,
        required: true
    },
    UARM: {
        type: String,
        required: true
    },
    DTITLE: {
        type: String,
        required: true
    },
    DARM: {
        type: String,
        required: true
    },
    UPET: {
        type: String,
        required: true
    },
    DPET: {
        type: String,
        required: true
    },
    GUILD: {
        type: String,
        required: true
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now
    },
    TIER: {
        type: Number,
        required: true
    },
    CORRUPTION_LEVEL: {
        type: Number,
        required: true
    }

});

const collection = "UNIVERSE"

module.exports = Universe = mongoose.model("universe", UniverseSchema, collection);