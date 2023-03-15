const mongoose = require('mongoose');

const userSChema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        minlength: [5, 'email must be at least 5 characters'],
        maxlength: [100, 'email must be at most 100 characters'],
        lowercase: true
    },
    username: {
        type: String,
        required: [true, 'username is required'],
        minlength: [3, 'username must be at least 3 characters'],
        maxlength: [30, 'username must be at most 5 characters']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: 6,
        maxlength: [100, 'password must be at most 100 characters']
    },
    profile: {
        type: String,
        default:'none'
    }
},
    {
    timestamps:true
    })

const User = mongoose.model('User', userSChema)

module.exports = User