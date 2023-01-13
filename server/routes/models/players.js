const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
    DISNAME: {
        type: String,
        required: false
    },
    NAME: {
        type: String,
        required: false
    },
    DID: {
        type: String,
        required: false
    },
    CURRENT_WORLD: {
        type: String,
        required: false
    },
    CURRENT_ZONE: {
        type: String,
        required: false
    },
    SPECTER: {
        type: Array,
        required: false
    },
    CARDS: {
        type: Array,
        required: false
    },
    EQUIPPED_RANK: {
        type: String,
        required: false
    },
    RANKS: {
        type: Array,
        required: false
    },
    GUILD: {
        type: String,
        required: false
    },
    USED_CODES: {
        type: Array,
        required: false
    },
    OWNED_CARDS: {
        type: Array,
        required: false
    },
    COMPLETED_QUESTS: {
        type: Array,
        required: false
    },
    TOTAL_ELEMENTAL_DAMAGE: {
        type: Array,
        required: false
    },
    TOTAL_SCENARIOS_COUNT: {
        type: Array,
        required: false
    },
    IS_ADMIN: {
        type: Boolean,
        required: false,
        default: false
    },
});

const collection = "players"

module.exports = Player = mongoose.model("players", PlayerSchema, collection);