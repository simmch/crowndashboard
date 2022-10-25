const mongoose = require("mongoose");

const SpecterSchema = new mongoose.Schema({
    NAME: {
        type: String,
        required: true
    },
    CODE: {
        type: String,
        required: true
    },
    CLASS: {
        type: String,
        required: true
    },
    IMAGE: {
        type: String,
        required: true
    },
    DESCRIPTION: {
        type: String,
        required: true
    }
});

const collection = "SPECTER"

module.exports = Specter  = mongoose.model("specter", SpecterSchema, collection);