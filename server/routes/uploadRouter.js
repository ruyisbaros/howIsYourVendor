const router = require('express').Router()
const { uploadImage, deleteImage, deleteImagesOfPost } = require('../controllers/uploadControllers')
const { protect } = require('../middleWares/authMiddleWare')


router.post("/", protect, uploadImage)
router.post("/delete", protect, deleteImage)
router.post("/:postId/delete_all", protect, deleteImagesOfPost)

module.exports = router