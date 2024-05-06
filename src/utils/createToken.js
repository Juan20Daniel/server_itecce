const jwt = require('jsonwebtoken');
const { secretKeyJwt } = require('../config/secretKeyJwt');

const createToken = (username) => {
    console.log(secretKeyJwt)
    return jwt.sign({data:username}, secretKeyJwt);
}

module.exports = {
    createToken
}