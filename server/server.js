const express = require("express");
const connectDB = require("./config/db");
const app = express();

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