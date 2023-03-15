const express = require('express')
const { getAllImagesById, insertNewImage, deleteImage } = require('../controllers/gallery.controller')
const {upload} = require('../middlewares/multer')
const router = express.Router()

router.get('/:id', getAllImagesById)
router.post("/", upload.single('image'), insertNewImage)
router.delete('/:id', deleteImage)

module.exports = router