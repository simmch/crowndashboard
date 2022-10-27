const mongoose = require("mongoose");

const ZoneSchema = new mongoose.Schema({
    ZONE_CODE: {
        type: String,
        required: true
    },
    TITLE: {
        type: String,
        required: true
    },
    WORLD: {
        type: String,
        required: true
    },
    AVAILABLE: {
        type: Boolean,
        required: true
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now
    },
});

const collection = "ZONES"

module.exports = Zone = mongoose.model("zones", ZoneSchema, collection);