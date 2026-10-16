const jwt = require('jsonwebtoken');

const SECRET = 'TBD';

function generateToken(username) {
  return jwt.sign({ sub: username }, SECRET, { expiresIn: '1h' });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { generateToken, verifyToken };
