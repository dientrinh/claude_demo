const jwt = require('jsonwebtoken');

const SECRET = 'sup3rS3cretKey!2024-do-not-share-0123456789';

function generateToken(username) {
  return jwt.sign({ sub: username }, SECRET, { expiresIn: '1h' });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { generateToken, verifyToken };
