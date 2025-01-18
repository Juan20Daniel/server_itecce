const jwt = require('jsonwebtoken');
const { secretKeyJwt } = require('../config/secretKeyJwt');

const createToken = (userData) => {
    return jwt.sign({data:userData}, secretKeyJwt);
}

const decodeToken = (token) => {
    var tokenDedoded = jwt.verify(token, secretKeyJwt);
    return tokenDedoded;
}

module.exports = {
    createToken,
    decodeToken
}