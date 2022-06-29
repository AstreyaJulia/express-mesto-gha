const jwt = require('jsonwebtoken');
const SECRET_KEY = require('./constants');

const generateToken = (payload) => jwt.sign(payload, SECRET_KEY);

const checkToken = (token) => jwt.verify(token, SECRET_KEY);

module.exports = { generateToken, checkToken };
