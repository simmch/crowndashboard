const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
    CARD_CODE: {
        type: String,
        required: true
    },

    NAME: {
        type: String,
        required: true
    },
    CARD_IMAGE: {
        type: String,
        required: true
    },
    VARIANT: {
        type: Boolean,
        required: true
    },

    CARD_VARIANT_NAME: {
        type: String,
        required: true
    },
    CLASS: {
        type: String,
        required: true
    },
    PRICE: {
        type: Number,
        required: true
    },
    MOVES: {
        type: Array,
        required: true
    },
    WORLD: {
        type: String,
        required: true
    },
    ATTACK: {
        type: Number,
        required: true
    },
    DEFENSE: {
        type: Number,
        required: true
    },
    SPEED: {
        type: Number,
        required: true
    },
    RANK: {
        type: Array,
        required: true
    },
    QUEST:{
        type: Array,
        required: true
    },
    MORALITY:{
        type: Number,
        required: true
    },
    RARITY:{
        type: Tier,
        required: false
    },
    TIER: {
        type: String,
        required: true
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now
    },
    AVAILABLE: {
        type: Boolean,
        required: true
    },
    ZONES: {
        type: Array,
        required: true
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

const collection = "CARDS"

module.exports = Card = mongoose.model("card", CardSchema, collection);