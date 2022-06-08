const router = require('express').Router()
const { createNewNotification, deleteANotification, getNotifications } = require('../controllers/NotificationControllers')
const { protect } = require('../middleWares/authMiddleWare')

router.post('/new', protect, createNewNotification)
router.get('/all', protect, getNotifications)
router.delete('/delete/:notifyId', protect, deleteANotification)

module.exports = router