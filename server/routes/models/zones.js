const mongoose = require("mongoose");

const ZoneSchema = new mongoose.Schema({
    ZONE_CODE: {
        type: String,
        required: false
    },
    TITLE: {
        type: String,
        required: false
    },
    WORLD: {
        type: String,
        required: false
    },
    AVAILABLE: {
        type: Boolean,
        required: false
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now
    },
});

const collection = "zones"

module.exports = Zone = mongoose.model("zones", ZoneSchema, collection);