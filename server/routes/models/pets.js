const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
    PET: {
        type: String,
        required: true
    },
    PATH: {
        type: String,
        required: true
    },
    ABILITIES: {
        type: Array,
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
    EXP: {
        type: Number,
        required: true
    },
    LVL: {
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
    }
});

const collection = "PET"

module.exports = Pet = mongoose.model("pet", PetSchema, collection);