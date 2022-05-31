const router = require('express').Router()
const { createComment } = require('../controllers/commentsControllers')
const { protect } = require('../middleWares/authMiddleWare')

router.post('/new', protect, createComment)

module.exports = router