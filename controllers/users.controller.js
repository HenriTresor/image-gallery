const User = require('../models/users.models')
const {hashPwd, comparePwd} = require("../utils/pwd.hash")
const createToken = require('../utils/jwt.js')

/**
 * @create new user 
 * POST /users/signup
 */

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        if (users != "") {
            return res.status(200).json(users)
        }
        res.sendStatus(204)
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message:"error retrieving users"})
    }
}

const createUser = async (req, res) => {
    try {

        let { email, username, password } = req.body
        if (!email || !username || !password) {
            return res.status(400).json({ message: "all fields required" })
        }

        let hashedPwd = await hashPwd(password)
        if (hashedPwd) {
            let newUser = new User({
                email,
                username,
                password: hashedPwd
            })

            await newUser.save()
            if (newUser) {
                let token =  createToken(newUser._id, newUser.email, newUser.username)
                res.cookie('jwt', token)
                return res.status(201).json({ message: "new user saved successfully" })
            }
            return res.status(403).json({ message: "user not created" })
        }
    } catch (err) {
        console.log(err.message, err.code);
        if (err.message.split(" ")[0] == "User") {
            return res.status(400).json({ message: err.message })
        } else if (err.code == 11000) {
            return res.status(500).json({ message: "email is already in use" })
        }
        res.status(500).json({ message: "error occurred while creating user" })
    }
}


/**
 * @login user
 * POST /users/login
 */

const loginUser = async (req, res) => {
    try {
        if (1 == 1) {
    
}
        let { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({message:"all fields are required"})
        }

        let currentUser = await User.findOne({ email }).lean().exec()
        if (currentUser) {
                    
            let comparedPwd = await comparePwd(password, currentUser.password)
            if (comparedPwd) {
                let token = createToken(currentUser._id, currentUser.email, currentUser.username)
                res.cookie('jwt', token)
                return res.status(201).json({ message: "user logged in" })
            }
            return res.status(401).json({message:"invalid password"})
        }
        return res.status(400).json({message:"user not found"})
        
    } catch (err) {
        console.log(err.message, err.code);
        res.status(500).json({err:err.message})
    }
}


/**
 * @upload profile picture
 * PUT
 */

const updateImg = async (req, res) => {
    try {
        
        let { email } = req.body
        let { originalname } = req.file

        if (!email || !originalname) {
            return res.status(400).json({message:"check if you have provided all required fields and try again"})
        }

        let currentUser = await User.findOne({ email })
        if (currentUser) {
            await User.findOneAndUpdate({email}, {profile : originalname})
            return res.status(201).redirect('/dashboard')
        }
        return res.status(404).json({message:"user not found"})
    } catch (err) {
        console.log('error updating image:',err.message);
        res.status(500).json({message:"error updating image"})
    }
}

module.exports = {
    createUser,
    getAllUsers,
    loginUser,
    updateImg
}