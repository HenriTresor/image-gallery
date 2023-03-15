const bcrypt = require('bcrypt');

const hashPwd = async (password) => {
    return bcrypt.hash(password, 10);
}

const comparePwd = async (password, currentUserPwd) => {
    return bcrypt.compare(password, currentUserPwd)
}

module.exports = {
    hashPwd,
    comparePwd
}