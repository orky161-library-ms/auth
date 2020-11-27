require("express-async-errors")
const express = require('express')
const authLogic = new (require("../bl/auth"))()

const router = express.Router()

router.post("/admin",(async (req, res) => {
    const employee = await authLogic.addAdminAuth(req.body)
    res.status(200).json({employee})
}))
router.post("/client",(async (req, res) => {
    const client = await authLogic.addClientAuth(req.body)
    res.status(200).json({client})
}))
router.post("/login",(async (req, res) => {
    const token = await authLogic.checkAuth(req.body)
    res.status(200).json({token})
}))
router.get("/verify",(async (req, res) => {
    const decoded = await authLogic.verifyToken(req.headers['x-access-token'])
    res.status(200).json({decoded})
}))

module.exports = router

