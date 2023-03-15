const express = require('express')
const { auth } = require('../middlewares/verifyToken')


const router = express.Router()

router.get('/', auth, (req, res) => {
    if (req.user && req.user != "") {
        return res.redirect('/dashboard')
    }
    res.render('homepage')
})

router.get('/dashboard', auth, (req, res) => {
    if (req.user && req.user != "") {
        let { email, id, username, profile } = req.user
        return res.render('dashboard', { email, id, username, profile })
    }
    res.redirect('/login')

})

router.get('/login', auth, (req, res) => {
    if (req.user && req.user != "") {
        return res.redirect('/dashboard')
    }
    res.render('login')

})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/logout', (req, res) => {
    if (req.cookies.jwt) {
        res.cookie('jwt', '', {
            maxAge: 1
        })

        res.redirect('/login')
    }
})


module.exports = router