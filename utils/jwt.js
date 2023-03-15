const jwt = require('jsonwebtoken')

const createToken = (id, email, username) => {
    let token = jwt.sign({ id, email, username }, process.env.JWT_TOKEN_SECRET, {
        expiresIn:'1w'
    })

    return token
}

module.exports = createToken