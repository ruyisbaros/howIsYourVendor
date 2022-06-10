const router = require('express').Router()
const { createNewNotification, deleteANotification, getNotifications, updateIsRead, deleteAllANotifications } = require('../controllers/NotificationControllers')
const { protect } = require('../middleWares/authMiddleWare')

router.post('/new', protect, createNewNotification)
router.get('/all', protect, getNotifications)
router.patch('/delete/:notifyId', protect, deleteANotification)
router.patch('/is_read/:notifyId', protect, updateIsRead)
router.delete('/del_all', protect, deleteAllANotifications)

module.exports = router