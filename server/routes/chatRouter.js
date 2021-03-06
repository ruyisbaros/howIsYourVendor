const router = require('express').Router()
const { createNewMessage, getConversations, getChatMessages, deleteAMessage, deleteAConversation } = require('../controllers/chatControllers')
const { protect } = require('../middleWares/authMiddleWare')

router.post("/new", protect, createNewMessage)
router.get("/conversations", protect, getConversations)
router.get("/between/:id", protect, getChatMessages)
router.delete("/delete/:id", protect, deleteAMessage)
router.delete("/conversation/:id", protect, deleteAConversation)

module.exports = router