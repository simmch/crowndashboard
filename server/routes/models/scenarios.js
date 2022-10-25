const mongoose = require("mongoose");

const ScenarioSchema = new mongoose.Schema({
    SCENARIO_CODE: {
        type: String,
        required: true
    },
    TITLE: {
        type: String,
        required: true
    },
    IMAGE: {
        type: String,
        required: true
    },
    REQUIRED_LEVEL: {
        type: Number,
        required: true
    },
    LEVEL: {
        type: Number,
        required: true
    },
    ENEMIES: {
        type: Array,
        required: true
    },
    DROPS: {
        type: Array,
        required: true
    },
    WORLD: {
        type: String,
        required: true
    },
    ZONE: {
        type: String,
        required: true
    },
    AVAILABLE: {
        type: Boolean,
        required: true
    }
});

const collection = "SCENARIO"

module.exports = Scenario = mongoose.model("scenario", ScenarioSchema, collection);