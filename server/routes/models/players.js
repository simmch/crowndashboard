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
    LVL: {
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
    MOVES: {
        type: Array,
        required: false
    },
    GUILD: {
        type: String,
        required: false
    },
    CLASS: {
        type: String,
        required: false
    },
    MORALITY: {
        type: String,
        required: false
    },
    MENTOR: {
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
    LEARNED_MOVES: {
        type: Array,
        required: false
    },
    COMPLETED_QUESTS: {
        type: Array,
        required: false
    },
    IS_ADMIN: {
        type: Boolean,
        required: false,
        default: false
    },
    WEAKNESS : {
        type: Array,
        required: false
    },
    RESISTANT: {
        type: Array,
        required: false
    },
    REPEL: {
        type: Array,
        required: false
    },
    IMMUNE: {
        type: Array,
        required: false
    },
    ABSORB: {
        type: Array,
        required: false
    }
});

const collection = "players"

module.exports = Player = mongoose.model("players", PlayerSchema, collection);