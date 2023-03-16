const express = require('express');
const { createUser, getAllUsers, loginUser, updateImg } = require('../controllers/users.controller');
const { uploadProfile } = require('../middlewares/multer');
const { auth } = require('../middlewares/verifyToken')


const router = express.Router()

router.post('/signup', createUser)
router.post('/login', loginUser)
router.get('/', auth,  getAllUsers)
router.post('/profile', uploadProfile.single('profile'), updateImg)

module.exports = router