const express = require("express");
const router = express.Router();
const request = require("request");
const Zone = require("../models/zones")

// @route   GET isekai/zones/
// @desc    Get all Zones
// @access  Public
router.get("/", async (req, res) => {

    try {
        const zone = await Zone.find({})
        res.json(zone);
        if (!zone) {
            return res
                .status(400)
                .json({ msg: "No Zones were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET isekai/zones/$zone
// @desc    Get Zones by Zone
// @access  Public
router.get("/:zone", async (req, res) => {

    try {
        const zone = await Zone.findOne({ 'ZONE_CODE' : req.params.zone });
        res.json(zone);
        if (!zone) {
            return res
                .status(400)
                .json({ msg: "No Zones were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET isekai/zones/$world
// @desc    Get Zones by Zone
// @access  Public
router.get("/:world", async (req, res) => {

    try {
        const zone = await Zone.find({ 'WORLD' : req.params.world });
        res.json(zone);
        if (!zone) {
            return res
                .status(400)
                .json({ msg: "No Zones were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST isekai/zones/new
// @desc    Create new Zone
// @access  Public
router.post("/new", async (req, res) => {

    const {
        ZONE_CODE,
        TITLE,
        WORLD,
        REQ_RANK,
        TIMESTAMP,
        AVAILABLE,
    } = req.body
    const zoneFields = {...req.body}

    try {
        let zone = await Zone.findOne({ ZONE_CODE: ZONE_CODE })
        if (zone) {
            res.send("Zone already exist. ")
            return
        }

        zone = new Zone(zoneFields)
        response = await zone.save()
        res.status(200).send("Zone added successfully!")

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST isekai/zones/update
// @desc    Update Zone info
// @access  Public
router.post("/update", async (req, res) => {
 
    const {
        ZONE_CODE,
        TITLE,
        WORLD,
        REQ_RANK,
        TIMESTAMP,
        AVAILABLE,
    } = req.body
    const zoneFields = {...req.body}

    try {
        await Zone.updateOne({ ZONE_CODE: ZONE_CODE }, zoneFields)
        res.status(200).send("Zone successfully updated!")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   DELETE isekai/zones/delete
// @desc    Delete a Zone
// @access  Public
router.delete("/delete", async (req, res) => {
    try {
        await Zone.findOneAndRemove({ZONE_CODE: req.body.ZONE_CODE})
        res.status(200).send("Zone successfully removed. ")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router