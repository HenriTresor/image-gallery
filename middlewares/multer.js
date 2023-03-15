const multer = require('multer')
const path = require('path')
const { diskStorage } = require('multer')
const { isNull } = require('util')

const storage = diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'public', 'images', 'uploads') )
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '_' +  req.body.email)
    }
})

const profilePicsStorage = diskStorage({
    destination: function (req, file, cb) {
        cb(isNull, path.join(__dirname, '..', 'public', 'images', 'profiles'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })
const uploadProfile = multer({ profilePicsStorage })

module.exports = {
    upload,
    uploadProfile
}