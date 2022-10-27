const express = require("express");
const router = express.Router();
const request = require("request");
const world = require("../models/worlds")

// @route   GET isekai/world/
// @desc    Get all worlds
// @access  Public
router.get("/", async (req, res) => {

    try {
        const world = await world.find({})
        res.json(world);
        if (!world) {
            return res
                .status(400)
                .json({ msg: "No worlds were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET isekai/world/$title
// @desc    Get world by title
// @access  Public
router.get("/:title", async (req, res) => {

    try {
        const world = await world.findOne({ 'TITLE' : req.params.TITLE });
        res.json(world);
        if (!world) {
            return res
                .status(400)
                .json({ msg: "No worlds were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST isekai/worlds/update
// @desc    Create new worlds
// @access  Public
router.post("/new", async (req, res) => {

    const {
        TITLE,
        IMAGE_PATH,
        AVAILABLE,
        TIMESTAMP,
    } = req.body
    const worldFields = {...req.body}
    try {
        let world = await world.findOne({ TITLE: TITLE })
        if (world) {
            res.send("world already exist. ")
            return
        }

        world = new world(worldFields)
        response = await world.save()

        res.status(200).send("world added successfully!")

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST isekai/world/update
// @desc    Update world info
// @access  Public
router.post("/update", async (req, res) => {
 
    const {
        TITLE,
        IMAGE_PATH,
        AVAILABLE,
        TIMESTAMP,

    } = req.body
    const worldFields = {...req.body}

    try {
        await world.updateOne({ TITLE: TITLE }, worldFields)
        res.status(200).send("world successfully updated!")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   DELETE isekai/world/delete
// @desc    Delete a world
// @access  Public
router.delete("/delete", async (req, res) => {
    try {
        await world.findOneAndRemove({TITLE: req.body.TITLE})
        res.status(200).send("world successfully removed. ")
    } catch(err) {
        res.status(500).send("Server Error")
    }
})

module.exports = router