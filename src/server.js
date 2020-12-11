require('dotenv').config("./env");

const {pool} = require("./config/index")
const {checkConnectionQuery} = require("./query_builder/queries")
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const authRouter = require("./routes/auth")

const app = express()
const port = 30000

app.use(cors())
app.use(bodyParser.json())
app.use("/api/auth", authRouter)

app.get('/ping', function (req, res) {
    res.status(200).json({msg: "ping by auth"})
})

app.get('/health', async function (req, res) {
    await pool.query(checkConnectionQuery)
    res.status(200).json({msg: "health"})
})

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});

