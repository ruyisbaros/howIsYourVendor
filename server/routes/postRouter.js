const router = require('express').Router()
const { createPost, getAllPosts, updateAPost, likeUnlike, getAUserPosts, getSinglePost, getPostDiscover,
    deleteAPost } = require('../controllers/postController')
const { protect } = require('../middleWares/authMiddleWare')


router.post('/new', protect, createPost)
router.get('/all', protect, getAllPosts)
router.get('/post_discover', protect, getPostDiscover)
router.get('/single/:postId', protect, getSinglePost)
router.get('/user/:userId', protect, getAUserPosts)
router.patch('/update/:postId', protect, updateAPost)
router.patch('/like_unlike/:postId', protect, likeUnlike)
router.delete('/delete/:postId', protect, deleteAPost)

module.exports = router