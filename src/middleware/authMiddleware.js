const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

// Auth Middleware
function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token is required');

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send('Invalid token');
    req.user = decoded;
    next();
  });
}

module.exports = authMiddleware;
