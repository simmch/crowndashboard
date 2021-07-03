const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
    NAME: {
        type: String,
        required: true
    },
    PATH: {
        type: String,
        required: true
    },
    RPATH: {
        type: String,
        required: true
    },
    GIF: {
        type: String,
        required: true
    },
    PRICE: {
        type: Number,
        required: true
    },
    MOVESET: {
        type: Array,
        required: true
    },
    HLT: {
        type: Number,
        required: true
    },
    STAM: {
        type: Number,
        required: true
    },
    ATK: {
        type: Number,
        required: true
    },
    DEF: {
        type: Number,
        required: true
    },
    SPD:{
        type: Number,
        required: true
    },
    ACC:{
        type: Number,
        required: true
    },
    VUL: {
        type: Boolean,
        required: true
    },
    COLLECTION: {
        type: String,
        required: true
    },
    HAS_COLLECTION: {
        type: Boolean,
        required: true
    },
    UNIVERSE: {
        type: String,
        required: true
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now
    },
    STOCK: {
        type: Number,
        required: true
    },
    AVAILABLE: {
        type: Boolean,
        required: true
    },
    EXCLUSIVE: {
        type: Boolean,
        required: true
    },
    DESCRIPTIONS: {
        type: Array,
        required: true
    }
});

const collection = "CARDS"

module.exports = Card = mongoose.model("card", CardSchema, collection);