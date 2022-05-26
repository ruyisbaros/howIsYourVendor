const router = require('express').Router()
const { searchUser } = require('../controllers/userControllers')
const { protect } = require('../middleWares/authMiddleWare')

router.get('/', protect, searchUser)

module.exports = router