const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {

        if (req.cookies.jwt) {
            let token = req.cookies.jwt
            if (token) {
                let decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
                if (decodedToken) {
                    req.user = decodedToken
                    next()
                }
                next()
            }
            next()
        }
        next()
    } catch (err) {
        if (err.message == "invalid signature") {
            res.cookie('jwt', '', {
                maxAge: 1
            })
            return res.render('403.ejs')
        }
        else {
            res.cookie('jwt', '', {
                maxAge: 1
            })
            return res.render('401.ejs')
        }
        console.log(err.message, err.code);
    }
}

module.exports = {
    auth
}