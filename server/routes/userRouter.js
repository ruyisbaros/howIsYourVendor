const router = require('express').Router()
const { searchUsers, getAUser } = require('../controllers/userControllers')
const { protect } = require('../middleWares/authMiddleWare')

router.get('/search', protect, searchUsers)
router.get('/user/:id', protect, getAUser)

module.exports = router