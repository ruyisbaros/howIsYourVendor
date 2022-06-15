const router = require('express').Router()
const { createNewMessage, getConversations, getChatMessages } = require('../controllers/chatControllers')
const { protect } = require('../middleWares/authMiddleWare')

router.post("/new", protect, createNewMessage)
router.get("/conversations", protect, getConversations)
router.get("/between/:id", protect, getChatMessages)

module.exports = router