const express = require("express");
const router = express.Router();
const request = require("request");
const Rank = require("../models/ranks")

// @route   GET rank/ranks/
// @desc    Get all ranks
// @access  Public
router.get("/", async (req, res) => {

    try {
        const ranks = await Rank.find({})
        res.json(ranks);
        if (!ranks) {
            return res
                .status(400)
                .json({ msg: "No ranks were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET rank/ranks/$rank
// @desc    Get Rank by name
// @access  Public
router.get("/:rank", async (req, res) => {

    try {
        const ranks = await Rank.findOne({ 'RANK_CODE' : req.params.rank });
        res.json(ranks);
        if (!ranks) {
            return res
                .status(400)
                .json({ msg: "No ranks were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET rank/ranks/$rank
// @desc    Get Rank by name
// @access  Public
router.get("/world/:world", async (req, res) => {

    try {
        const ranks = await Rank.find({ 'WORLD' : req.params.world });
        res.json(ranks);
        if (!ranks) {
            return res
                .status(400)
                .json({ msg: "No ranks were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET rank/ranks/$world
// @desc    Get Rank by world
// @access  Public
router.get("/:rank", async (req, res) => {

    try {
        const ranks = await Rank.findOne({ 'RANK_CODE' : req.params.RANK_CODE });
        res.json(ranks);
        if (!ranks) {
            return res
                .status(400)
                .json({ msg: "No ranks were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST rank/ranks/new
// @desc    Create new Rank
// @access  Public
router.post("/new", async (req, res) => {

    const {
        RANK_CODE,
        TITLE,
        WORLD,
        BUFF,
        REQUIRED_MORALITY,
    } = req.body
    const rankFields = {...req.body}

    try {
        let rank = await Rank.findOne({ RANK_CODE: RANK_CODE })
        if (rank) {
            res.send("Rank already exist. ")
            return
        }

        rank = new Rank(rankFields)
        response = await rank.save()
        res.status(200).send("Rank added successfully!")

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST rank/ranks/update
// @desc    Update Rank info
// @access  Public
router.post("/update", async (req, res) => {
 
    const {
        RANK_CODE,
        TITLE,
        WORLD,
        BUFF,
        REQUIRED_MORALITY,
    } = req.body
    const rankFields = {...req.body}

    try {
        await Rank.updateOne({ RANK_CODE: RANK_CODE }, rankFields)
        res.status(200).send("Rank successfully updated!")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   DELETE rank/ranks/delete
// @desc    Delete a Rank
// @access  Public
router.delete("/delete", async (req, res) => {
    try {
        await Rank.findOneAndRemove({RANK_CODE: req.body.RANK_CODE})
        res.status(200).send("Rank successfully removed. ")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router