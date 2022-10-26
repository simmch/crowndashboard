require("dotenv").config();
//const DiscordStrategy = require("passport-discord").Strategy;
const DiscordStrategy = require('@oauth-everything/passport-discord').Strategy;
const passport = require("passport");
const Player = require("../routes/models/players")

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    const user = await Player.findById(id);
    if (user)
        done(null, user);
});

var scopes = ['identify', 'email', 'guilds']


passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: scopes
}, async (accessToken, refreshToken, profile, done) => {
    var disname = profile.username;
    var pound = "#";
    var discrim = profile.discriminator;
    try {
        const user = await Player.findOne({ DID: profile.id });
        if (user) {
            done(null, user)
        }
        else {
            playerFields = {
                DISNAME: disname.concat(pound, discrim),
                NAME: profile.username,
                DID: profile.id,
                GUILD: '',
                CURRENT_WORLD: '',
                CURRENT_ZONE: '',
                SPECTER: '',
                LVL: '',
                CARDS: [],
                EQUIPPED_RANK: '',
                RANKS: [],
                MOVES: [],
                CLASS: '',
                MORALITY: 50,
                MENTOR: '',
                USED_CODES: [],
                OWNED_CARDS: [],
                LEARNED_MOVES: [],
                COMPLETED_QUESTS: [],
                IS_ADMIN: false,
                WEAKNESS: [],
                RESISTANT: [],
                REPEL: [],
                IMMUNE: [],
                ABSORB: []
            }
            const newPlayer = new Player(playerFields);
            const savedPlayer = await newPlayer.save();
            done(null, user)
        }
    } catch (err) {
        console.error("Server Error: " + err)
        done(err, null)
    }
}))