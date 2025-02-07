// const jwt = require('jsonwebtoken');

// // Secret key for JWT
// const SECRET_KEY = 'your_secret_key_here';

// const authenticateToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   try {
//     const verified = jwt.verify(token, SECRET_KEY);
//     req.user = verified; // Attach user details to the request object
//     next();
//   } catch (error) {
//     res.status(403).json({ message: 'Invalid or expired token.' });
//   }
// };

// module.exports = authenticateToken;
