const router = require('express').Router()
const { createPost } = require('../controllers/postController')
const { protect } = require('../middleWares/authMiddleWare')


router.post('/new', protect, createPost)

module.exports = router