const express = require("express");
const router = express.Router();
const request = require("request");
const Player = require("../models/players")

// @route   GET isekai/players/
// @desc    Get all players
// @access  Public
router.get("/", async (req, res) => {

    try {
        const players = await Player.find({})
        res.json(players);
        if (!players) {
            return res
                .status(400)
                .json({ msg: "No players were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET isekai/players/$disname
// @desc    Get players by name
// @access  Public
router.get("/:disname", async (req, res) => {

    try {
        const players = await Player.findOne({ 'DISNAME' : req.params.disname });
        res.json(players);
        if (!players) {
            return res
                .status(400)
                .json({ msg: "No players were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST isekai/players/new
// @desc    Create new player
// @access  Public
router.post("/new", async (req, res) => {

    const {
        DISNAME,
        DID,
        LVL,
        AVATAR,
        CURRENT_WORLD,
        CURRENT_ZONE,
        SPECTER,
        CARDS,
        EQUIPPED_RANK,
        RANKS,
        MOVES,
        GUILD,
        CLASS,
        USED_CODES,
        COMPLETED_QUESTS,
        TIMESTAMP,
        MORALITY,
        IS_ADMIN
    } = req.body
    const playerFields = {...req.body}

    try {
        let player = await Player.findOne({ DISNAME: DISNAME })
        if (player) {
            res.send("Player already exist. ")
            return
        }

        player = new Player(playerFields)
        response = await Player.save()
        res.status(200).send("Player added successfully!")

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST isekai/Players/update
// @desc    Update Player info
// @access  Public
router.post("/update", async (req, res) => {
 
    const {
        DISNAME,
        DID,
        LVL,
        AVATAR,
        CURRENT_WORLD,
        CURRENT_ZONE,
        SPECTER,
        CARDS,
        EQUIPPED_RANK,
        RANKS,
        MOVES,
        GUILD,
        CLASS,
        USED_CODES,
        COMPLETED_QUESTS,
        TIMESTAMP,
        MORALITY,
        IS_ADMIN

    } = req.body
    const playerFields = {...req.body}

    try {
        await Player.updateOne({ DISNAME: DISNAME }, playerFields)
        res.status(200).send("Player successfully updated!")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   DELETE isekai/Players/delete
// @desc    Delete a Player
// @access  Public
router.delete("/delete", async (req, res) => {
    try {
        await Player.findOneAndRemove({DISNAME: req.body.DISNAME})
        res.status(200).send("Player successfully removed. ")
    } catch(err) {
        res.status(500).send("Server Error")
    }
})

module.exports = router