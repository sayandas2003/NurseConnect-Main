// const User = require('../models/user');
// const jwt = require('jsonwebtoken');

// // User signup controller
// const signup = async (req, res) => {
//   const { email, password, confirmPassword } = req.body;

//   if (password !== confirmPassword)
//     return res.status(400).json({ error: 'Passwords do not match' });

//   try {
//     const user = new User({ email, password });
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(400).json({ error: 'Email already exists or invalid input' });
//   }
// };

// // User login controller
// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ error: 'User does not exist' });

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });
//     res.status(200).json({ message: 'Login successful', token });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// module.exports = { signup, login };
