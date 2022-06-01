const router = require('express').Router()
const { createComment, updateAComment, likeUnLikeComment } = require('../controllers/commentsControllers')
const { protect } = require('../middleWares/authMiddleWare')

router.post('/new', protect, createComment)
router.patch('/comment/:commentId', protect, updateAComment)
router.patch('/like/:commentId', protect, likeUnLikeComment)

module.exports = router