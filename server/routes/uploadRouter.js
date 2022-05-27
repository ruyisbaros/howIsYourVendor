const router = require('express').Router()
const { uploadImage, deleteImage } = require('../controllers/uploadControllers')
const { protect } = require('../middleWares/authMiddleWare')


router.post("/", protect, uploadImage)
router.post("/delete", protect, deleteImage)

module.exports = router