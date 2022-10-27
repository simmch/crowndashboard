const express = require("express");
const router = express.Router();
const request = require("request");
const Card = require("../models/cards")
const auth = require("../middleware/isAuthorized")

// @route   GET isekai/cards/
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
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET isekai/cards/$name
// @desc    Get cards by name
// @access  Public
router.get("/:name", auth, async (req, res) => {
    try {
        const cards = await Card.findOne({ 'NAME': req.params.name });
        if (!cards) {
            res.status(400).send("Card not found.")
        } else {
            res.json(cards);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET isekai/cards/$world
// @desc    Get cards by world
// @access  Public
router.get("/world/:world", auth, async (req, res) => {
    try {
        const cards = await Card.find({ 'WORLD': req.params.world });
        if (!cards) {
            res.status(400).send("Card not found.")
        } else {
            res.json(cards);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST isekai/cards/new
// @desc    Create new card
// @access  Public
router.post("/new", auth, async (req, res) => {

    const {
        CARD_CODE,
        NAME,
        CARD_IMAGE,
        VARIANT,
        CARD_VARIANT_NAME,
        CLASS,
        ATTACK,
        DEFENSE,
        SPEED,
        WORLD,
        RANK,
        OWNED_RANKS,
        QUESTS,
        PRICE,
        MORALITY,
        RARITY,
        TIER,
        TIMESTAMP,
        AVAILABLE,
        ZONES,
        WEAKNESS,
        RESISTANT,
        REPEL,
        ABSORB,
        IMMUNE,
        MOVES,
    } = req.body
    const cardFields = { ...req.body }
    try {
        let card = await Card.findOne({ NAME: NAME })
        if (card) {
            res.send("Card already exist. ")
            return
        }

        card = new Card(cardFields)
        response = await card.save()
        res.status(200).send("Card added successfully!")

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST isekai/cards/update
// @desc    Update card info
// @access  Public
router.post("/update", auth, async (req, res) => {

    const {
        CARD_CODE,
        NAME,
        CARD_IMAGE,
        VARIANT,
        CARD_VARIANT_NAME,
        CLASS,
        ATTACK,
        DEFENSE,
        SPEED,
        WORLD,
        PRICE,
        RANK,
        OWNED_RANKS,
        QUESTS,
        MORALITY,
        RARITY,
        TIER,
        TIMESTAMP,
        AVAILABLE,
        ZONES,
        WEAKNESS,
        RESISTANT,
        REPEL,
        ABSORB,
        IMMUNE,
        MOVES,
    } = req.body
    const cardFields = { ...req.body }

    try {
        await Card.updateOne({ NAME: NAME }, cardFields)
        res.status(200).send("Card successfully updated!")
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   DELETE isekai/cards/delete
// @desc    Delete a card
// @access  Public
router.delete("/delete", auth, async (req, res) => {
    const {
        CARD_CODE,
        NAME,
        CARD_IMAGE,
        VARIANT,
        CARD_VARIANT_NAME,
        CLASS,
        ATTACK,
        DEFENSE,
        PRICE,
        SPEED,
        WORLD,
        RANK,
        OWNED_RANKS,
        QUESTS,
        MORALITY,
        RARITY,
        TIER,
        TIMESTAMP,
        AVAILABLE,
        ZONES,
        WEAKNESS,
        RESISTANT,
        REPEL,
        ABSORB,
        IMMUNE,
        MOVES
    } = req.body
    const cardFields = { ...req.body }
    try {
        await Card.findOneAndRemove({ NAME: cardFields.NAME })
        res.status(200).send("Card successfully removed. ")
    } catch (err) {
        res.status(500).send("Server Error")
    }
})

module.exports = router