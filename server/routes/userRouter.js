const router = require('express').Router()
const { searchUsers } = require('../controllers/userControllers')
const { protect } = require('../middleWares/authMiddleWare')

router.get('/search', protect, searchUsers)

module.exports = router