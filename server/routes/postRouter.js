const router = require('express').Router()
const { createPost, getAllPosts, updateAPost, likeUnlike, getAUserPosts, getSinglePost, getPostDiscover,
    deleteAPost, savedPost, getSavedPosts } = require('../controllers/postController')
const { protect } = require('../middleWares/authMiddleWare')


router.post('/new', protect, createPost)
router.get('/all', protect, getAllPosts)
router.get('/post_discover', protect, getPostDiscover)
router.get('/single/:postId', protect, getSinglePost)
router.get('/user/:userId', protect, getAUserPosts)
router.get('/saved_posts', protect, getSavedPosts)
router.patch('/update/:postId', protect, updateAPost)
router.patch('/like_unlike/:postId', protect, likeUnlike)
router.delete('/delete/:postId', protect, deleteAPost)
router.patch('/saved_post/:postId', protect, savedPost)

module.exports = router