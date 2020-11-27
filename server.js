require('dotenv').config("./env");

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const authRouter = require("./src/routes/auth")

const app = express()
const port = 30000

app.use(cors())
app.use(bodyParser.json())
app.use("/api/auth", authRouter)

app.get('/ping', function (req, res) {
    res.status(200).json({msg: "ping by auth"})
})

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});

