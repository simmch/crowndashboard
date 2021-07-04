const express = require("express");
const connectDB = require("./config/db");
const app = express();
const session = require("express-session")
const passport = require("passport")
const discordStrategy = require("./strategies/discordstrategy")

connectDB();

app.use(express.json({ extended: false }))

const port = process.env.PORT || 5000;
console.log(port)
app.listen(port, () => {
    console.log(`Server is open on port: ${port}.`)
})

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use("/crown/cards", require("./routes/api/card_api"))
app.use("/crown/pets", require("./routes/api/pet_api"))
app.use("/crown/titles", require("./routes/api/titles_api"))
app.use("/crown/arms", require("./routes/api/arm_api.js"))
app.use("/crown/users", require("./routes/api/user_api"))
app.use("/crown/matches", require("./routes/api/matches_api.js"))
// app.use("/crown/auth", require("./routes/api/auth_api.js"))

// Auth Routes
const authRoute =  require('./routes/api/auth_api')

app.use(session({
    secret: 'some random secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false,
    name: 'Discord Auth'
}))

app.use(passport.initialize());
app.use(passport.session());

// Middleware Route
app.use('/auth', authRoute)