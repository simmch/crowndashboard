const express = require("express");
const router = express.Router();
const request = require("request");
const Specter = require("../models/specters")

// @route   GET isekai/specters/
// @desc    Get all specters
// @access  Public
router.get("/", async (req, res) => {

    try {
        const specters = await Specter.find({})
        res.json(specters);
        if (!specters) {
            return res
                .status(400)
                .json({ msg: "No specters were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET isekai/specters/$specter
// @desc    Get specters by SPECTER
// @access  Public
router.get("/:specter", async (req, res) => {

    try {
        const specters = await Specter.findOne({ 'SPECTER' : req.params.specter });
        res.json(specters);
        if (!specters) {
            return res
                .status(400)
                .json({ msg: "No specters were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET isekai/specters/$world
// @desc    Get specters by SPECTER
// @access  Public
router.get("/:world", async (req, res) => {

    try {
        const specters = await Specter.findOne({ 'WORLD' : req.params.world });
        res.json(specters);
        if (!specters) {
            return res
                .status(400)
                .json({ msg: "No specters were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST isekai/specters/new
// @desc    Create new Specter
// @access  Public
router.post("/new", async (req, res) => {

    const {
        SPECTER,
        PATH,
        WORLD,
        LVL,
        ABILITIES,
        COLLECTION,
        TIMESTAMP,
        AVAILABLE,
        EXCLUSIVE
    } = req.body
    const specterFields = {...req.body}

    try {
        let specter = await Specter.findOne({ SPECTER: SPECTER })
        if (specter) {
            res.send("Specter already exist. ")
            return
        }

        specter = new Specter(specterFields)
        response = await specter.save()
        res.status(200).send("Specter added successfully!")

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST isekai/specters/update
// @desc    Update Specter info
// @access  Public
router.post("/update", async (req, res) => {
 
    const {
        SPECTER,
        PATH,
        ABILITIES,
        LVL,
        WORLD,
        COLLECTION,
        TIMESTAMP,
        AVAILABLE,
        EXCLUSIVE
    } = req.body
    const specterFields = {...req.body}

    try {
        await Specter.updateOne({ SPECTER: SPECTER }, specterFields)
        res.status(200).send("Specter successfully updated!")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   DELETE isekai/specters/delete
// @desc    Delete a Specter
// @access  Public
router.delete("/delete", async (req, res) => {
    try {
        await Specter.findOneAndRemove({SPECTER: req.body.SPECTER})
        res.status(200).send("Specter successfully removed. ")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router