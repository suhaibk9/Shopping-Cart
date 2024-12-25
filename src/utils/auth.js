const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../config/serverConfig');
const UnauthorizedError = require('../exceptions/unauthorized_error');
function generateJWT(payload) {
  console.log('called actual method');
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

function verifyToken(token) {
  console.log('Called Verify Token');
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new UnauthorizedError();
  }
}

module.exports = {
  generateJWT,
  verifyToken,
};
