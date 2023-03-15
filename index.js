if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}


// require external files
require('./configs/db.config')

// require modules
const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

// constants

const app = express()

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

app.listen(process.env.PORT, () => {
    console.log(`server listening on ${process.env.PORT}`);
})