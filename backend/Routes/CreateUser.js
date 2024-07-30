// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const { body, validationResult } = require('express-validator');

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const jwtSecret = "MynameisChaitanyaKalra$$"

// // Route for creating a new user
// router.post(
//   "/createUser",
//   [
//     body('email').isEmail(),
//     body('name').isLength({ min: 5 }),
//     body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
//   ],
//   async (req, res) => {
//     try {
//       // Check for validation errors
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(422).json({ success: false, errors: errors.array() });
//       }


//       const salt = await bcrypt.genSalt(10);
//       let secPassword = await bcrypt.hash(req.body.password, salt)


//       // Create a new user
//       await User.create({
//         name: req.body.name,
//         password: secPassword,
//         email: req.body.email,
//         location: req.body.location
//       });

//       res.json({ success: true, message: 'User created successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, message: 'Internal server error' });
//     }
//   }
// );

// // Route for user login
// router.post(
//   "/loginUser",
//   [
//     body('email').isEmail(),
//     body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
//   ],
//   async (req, res) => {
//     try {
//       // Check for validation errors
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(422).json({ success: false, errors: errors.array() });
//       }

//       const { email, password } = req.body;
//       // Find the user by email
//       const userData = await User.findOne({ email });

//       // compares org password with hashed pswd
//       const pwdCompare = await bcrypt.compare(req.body.password, userData.password)


//       // If user not found or password doesn't match
//       if (!pwdCompare) {
//         return res.status(400).json({ success: false, message: 'Invalid email or password' });
//       }

//       // Authentication successful

//       const data = {
//         user: {
//           id: userData.id
//         }
//       }

//       const authToken = jwt.sign(data, jwtSecret);
//       return res.json({ success: true, authToken: authToken, message: 'Login successful' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, message: 'Internal server error' });
//     }
//   }
// );

// module.exports = router;


const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "MynameisChaitanyaKalra$$";

// Route for creating a new user
router.post(
  "/createUser",
  [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }

      const salt = await bcrypt.genSalt(10);
      let secPassword = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location
      });

      res.json({ success: true, message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
);

// Route for user login
router.post(
  "/loginUser",
  [
    body('email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }

      const { email, password } = req.body;
      // Find the user by email
      const userData = await User.findOne({ email });

      if (!userData) {
        return res.status(400).json({ success: false, message: 'Invalid email or password' });
      }

      // Compare the provided password with the stored hashed password
      const pwdCompare = await bcrypt.compare(password, userData.password);

      if (!pwdCompare) {
        return res.status(400).json({ success: false, message: 'Invalid email or password' });
      }

      // Authentication successful
      const data = {
        user: {
          id: userData.id
        }
      }

      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken: authToken, name: userData.name, message: 'Login successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
);

module.exports = router;
