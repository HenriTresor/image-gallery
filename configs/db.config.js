const mongoose = require('mongoose')

mongoose.connect(process.env.DB_STR, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => {
    console.log('connected to database')
}).catch((err) => {
    console.log('ERR CONNECTING TO DB: ' + err.message);
})

const con = mongoose.Connection

process.on('SIGINT', () => {
    con.close().then(() => {
        process.exit(0);
    })
})
