require("express-async-errors")
const express = require('express')
const {checkAuth, addAdminAuth, addClientAuth, addAuthorAuth} = require("../controller/auth")
const {libraryAuth} = require("../config/index")
const {verifyPermission, decodeToken} = libraryAuth
const router = express.Router()

router.post("/admin", (async (req, res) => {
    const employee = await addAdminAuth(req.body)
    res.status(200).json({employee})
}))

router.post("/client", (async (req, res) => {
    const client = await addClientAuth(req.body)
    res.status(200).json({client})
}))

router.post("/author", (async (req, res) => {
    const author = await addAuthorAuth(req.body)
    res.status(200).json({author})
}))

router.post("/login", (async (req, res) => {
    const token = await checkAuth(req.body)
    res.status(200).json({token})
}))

module.exports = router

