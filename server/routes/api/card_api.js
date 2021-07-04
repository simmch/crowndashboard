const express = require("express");
const router = express.Router();
const request = require("request");
const Card = require("../models/cards")

// @route   GET crown/cards/
// @desc    Get all cards
// @access  Public
router.get("/", async (req, res) => {

    try {
        const cards = await Card.find({})
        res.json(cards);
        if (!cards) {
            return res
                .status(400)
                .json({ msg: "No cards were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET crown/cards/$name
// @desc    Get cards by name
// @access  Public
router.get("/:name", async (req, res) => {

    try {
        const cards = await Card.findOne({ 'NAME' : req.params.name });
        res.json(cards);
        if (!cards) {
            return res
                .status(400)
                .json({ msg: "No cards were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST crown/cards/new
// @desc    Create new card
// @access  Public
router.post("/new", async (req, res) => {

    const {
        NAME,
        PATH,
        RPATH,
        GIF,
        PRICE,
        MOVESET,
        HLT,
        STAM,
        ATK,
        DEF,
        SPD,
        ACC,
        VUL,
        COLLECTION,
        HAS_COLLECTION,
        UNIVERSE,
        TIMESTAMP,
        STOCK,
        AVAILABLE,
        EXCLUSIVE,
        DESCRIPTIONS
    } = req.body
    const cardFields = {...req.body}

    try {
        let card = await Card.findOne({ NAME: NAME })
        if (card) {
            res.send("Card already exist. ")
            return
        }

        card = new Card(cardFields)
        response = await card.save()
        res.status(200).send("Card added successfully!")

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST crown/cards/update
// @desc    Update card info
// @access  Public
router.post("/update", async (req, res) => {
 
    const {
        NAME,
        PATH,
        RPATH,
        GIF,
        PRICE,
        MOVESET,
        HLT,
        STAM,
        ATK,
        DEF,
        SPD,
        ACC,
        VUL,
        COLLECTION,
        HAS_COLLECTION,
        UNIVERSE,
        TIMESTAMP,
        STOCK,
        AVAILABLE,
        EXCLUSIVE,
        DESCRIPTIONS
    } = req.body
    const cardFields = {...req.body}

    try {
        await Card.updateOne({ NAME: NAME }, cardFields)
        res.status(200).send("Card successfully updated!")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   DELETE crown/cards/delete
// @desc    Delete a card
// @access  Public
router.delete("/delete", async (req, res) => {
    try {
        await Card.findOneAndRemove({NAME: req.body.NAME})
        res.status(200).send("Card successfully removed. ")
    } catch(err) {
        res.status(500).send("Server Error")
    }
})

module.exports = router