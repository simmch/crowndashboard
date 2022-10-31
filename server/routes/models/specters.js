const mongoose = require("mongoose");

const SpecterSchema = new mongoose.Schema({
    NAME: {
        type: String,
        required: false
    },
    CODE: {
        type: String,
        required: false
    },
    CLASS: {
        type: String,
        required: false
    },
    IMAGE: {
        type: String,
        required: false
    },
    DESCRIPTION: {
        type: String,
        required: false
    }
});

const collection = "specters"

module.exports = Specter  = mongoose.model("specter", SpecterSchema, collection);