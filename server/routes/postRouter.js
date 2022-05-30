const router = require('express').Router()
const { createPost, getAllPosts } = require('../controllers/postController')
const { protect } = require('../middleWares/authMiddleWare')


router.post('/new', protect, createPost)
router.get('/all', protect, getAllPosts)

module.exports = router