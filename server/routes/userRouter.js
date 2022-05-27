const router = require('express').Router()
const { searchUsers, getAUser, updateProfile } = require('../controllers/userControllers')
const { protect } = require('../middleWares/authMiddleWare')

router.get('/search', protect, searchUsers)
router.get('/user/:id', protect, getAUser)
router.patch('/profile_update', protect, updateProfile)

module.exports = router