const router = require('express').Router()
const { createNewNotification } = require('../controllers/NotificationControllers')
const { protect } = require('../middleWares/authMiddleWare')

router.post('/new', protect, createNewNotification)

module.exports = router