const mongoose = require("mongoose");

const ScenarioSchema = new mongoose.Schema({
    SCENARIO_CODE: {
        type: String,
        required: false
    },
    TITLE: {
        type: String,
        required: false
    },
    IMAGE: {
        type: String,
        required: false
    },
    REQUIRED_LEVEL: {
        type: String,
        required: false
    },
    REQUIRED_RANK: {
        type: String,
        required: false
    },
    REWARDED_RANK: {
        type: String,
        required: false
    },
    ENEMY_LEVEL: {
        type: Number,
        required: false
    },
    ENEMIES: {
        type: Array,
        required: false
    },
    DROPS: {
        type: Array,
        required: false
    },
    WORLD: {
        type: String,
        required: false
    },
    ZONE: {
        type: String,
        required: false
    },
    AVAILABLE: {
        type: Boolean,
        required: false
    }
});

const collection = "scenarios"

module.exports = Scenario = mongoose.model("scenario", ScenarioSchema, collection);