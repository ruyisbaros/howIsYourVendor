const router = require('express').Router()

const { register, login, logout, generateRefreshToken } = require("../controllers/authControllers")

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/refresh_token", generateRefreshToken)

module.exports = router