if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}



// require modules
const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
// constants

const app = express()

// connect to db and start server

mongoose.connect(process.env.DB_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to database')
}).then(() => {
    app.listen(process.env.PORT || 7000, () => {
        console.log(`app listening on port ${process.env.PORT || 7000}`);
    })
}).catch((err) => {
        console.log('ERR CONNECTING TO DB: ' + err.message);
    })

// configure default engine

app.set('view engine', 'ejs')

// middlewares

app.use(morgan('dev'))
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

// route middlewares

app.use('/', require('./routers/index.router'))
app.use('/users', require('./routers/user.router'))
app.use('/images', require("./routers/gallery.router"))

// listen for incoming requests


// send 404

app.all('/*', (req, res) => {
    res.render('404.ejs')
})