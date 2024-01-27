require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

const generateTokens = (payload) => ({
  accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: jwtConfig.access.expiresIn }),
  refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: jwtConfig.refresh.expiresIn }),
}

);
//console.log(generateTokens({ user: { id: 1, email: 'o@o', name: 'oo' } }))

module.exports = { generateTokens };
