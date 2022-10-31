const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
    DISNAME: {
        type: String,
        required: true
    },
    NAME: {
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
    CURRENT_WORLD: {
        type: String,
        required: true
    },
    CURRENT_ZONE: {
        type: String,
        required: true
    },
    SPECTER: {
        type: Array,
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
    MENTOR: {
        type: String,
        required: true
    },
    USED_CODES: {
        type: Array,
        required: true
    },
    OWNED_CARDS: {
        type: Array,
        required: true
    },
    LEARNED_MOVES: {
        type: Array,
        required: true
    },
    COMPLETED_QUESTS: {
        type: Array,
        required: true
    },
    IS_ADMIN: {
        type: Boolean,
        required: true,
        default: false
    },
    WEAKNESS : {
        type: Array,
        required: true
    },
    RESISTANT: {
        type: Array,
        required: true
    },
    REPEL: {
        type: Array,
        required: true
    },
    IMMUNE: {
        type: Array,
        required: true
    },
    ABSORB: {
        type: Array,
        required: true
    }
});

const collection = "PLAYER"

module.exports = Player = mongoose.model("players", PlayerSchema, collection);