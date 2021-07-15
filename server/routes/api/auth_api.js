const express = require("express")
const router = express.Router()
const passport = require("passport");
const isAuth = require("../middleware/isAuthorized")

router.get("/", passport.authenticate('discord'));
router.get("/https://discord.com/api/oauth2/authorize?client_id=861296553704816671&redirect_uri=https%3A%2F%2Fcrowndashboard.herokuapp.com%2Fauth%2Fredirect&response_type=code&scope=identify%20email%20guilds", passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: '/'
}))

router.get("/user", isAuth, (req, res) => {
    if(req.user){ 
        res.send({"data": req.user, "authenticated": true}) 
    } else {
        res.send({"message": "User not authenticated. Please login.", "authenticated": false})
    }
    
    
})

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
})

module.exports = router