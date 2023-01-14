const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
    CARD_CODE: {
        type: String,
        required: false
    },
    NAME: {
        type: String,
        required: false
    },
    CARD_IMAGE: {
        type: String,
        required: false
    },
    VARIANT: {
        type: String,
        required: false
    },
    CARD_VARIANT_NAME: {
        type: String,
        required: false
    },
    MAIN_ELEMENT: {
        type: String,
        required: false
    },
    CLASS: {
        type: String,
        required: false
    },
    PRICE: {
        type: Number,
        required: false
    },
    MOVES: {
        type: Array,
        required: false
    },
    WORLD: {
        type: String,
        required: false
    },
    HEALTH: {
        type: Number,
        required: false
    },
    ATTACK: {
        type: Number,
        required: false
    },
    DEFENSE: {
        type: Number,
        required: false
    },
    SPEED: {
        type: Number,
        required: false
    },
    ACCURACY: {
        type: Number,
        required: false
    },
    EVASION: {
        type: Number,
        required: false
    },
    RANK: {
        type: String,
        required: false
    },
    QUEST:{
        type: Array,
        required: false
    },
    MORALITY:{
        type: Number,
        required: false
    },
    TIER: {
        type: Number,
        required: false
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now
    },
    AVAILABLE: {
        type: Boolean,
        required: false
    },
    ZONES: {
        type: Array,
        required: false
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

const collection = "cards"

module.exports = Card = mongoose.model("cards", CardSchema, collection);