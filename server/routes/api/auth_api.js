const express = require("express")
const router = express.Router()
const passport = require("passport");

router.get("/", passport.authenticate('discord'));
router.get("/redirect", passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: '/'
}))

module.exports = router