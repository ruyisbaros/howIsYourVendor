const router = require('express').Router()
const { searchUsers, getAUser, updateProfile, followingsOps } = require('../controllers/userControllers')
const { protect } = require('../middleWares/authMiddleWare')

router.get('/search', protect, searchUsers)
router.patch('/follow_unFollow/:id', followingsOps)
router.get('/user/:id', protect, getAUser)
router.patch('/profile_update', protect, updateProfile)


module.exports = router