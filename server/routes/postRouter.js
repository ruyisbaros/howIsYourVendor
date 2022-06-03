const router = require('express').Router()
const { createPost, getAllPosts, updateAPost, likeUnlike, getAUserPosts } = require('../controllers/postController')
const { protect } = require('../middleWares/authMiddleWare')


router.post('/new', protect, createPost)
router.get('/all', protect, getAllPosts)
router.get('/user/:userId', protect, getAUserPosts)
router.patch('/update/:postId', protect, updateAPost)
router.patch('/like_unlike/:postId', protect, likeUnlike)

module.exports = router