const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator'); // 
const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser');

const router = express.Router();
const JWT_SECRET = 'Priyanshuisgood$boy';

// Create a user using: POST "/api/auth/"
router.post(
  '/createuser',
  [
    body('name').notEmpty().withMessage('Enter a valid name'),
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
  ],
  async (req, res) => {
    
    try {
      let success = false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;

      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success, errors: [{ msg: 'Email already exists' }] });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        id: user.id
      }
   
      var token = jwt.sign(data, JWT_SECRET);
      await user.save();
      success = true;
      res.json({success, token});
      // res.json(user);
    } catch (error) {
      
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
);

// Authantication a user POST "/api/auth/login" No login require
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').exists(),
  ],
  async (req, res) => {
let success = false;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Check if the email already exists
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return res.status(400).json({ errors: [{ msg: 'Please try to login witg correct credentials' }] });
        success = false;
      }
      const passCompare = await bcrypt.compare(password, existingUser.password);
   if(!passCompare)
   {
    return res.status(400).json({ errors: [{ msg: 'Please try to login witg correct credentials' }] });
    success = false
   }

      
      const data = {
        user:{
        id: existingUser.id
        }
      }

      var token = jwt.sign(data, JWT_SECRET);
      await existingUser.save();
      success = true;
      res.json({success, token});
      // res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }


  });

// logined user details

router.post(
  '/getuser', fetchuser, async (req, res) => {

    try {
     console.log(req.user.id)
      userID = req.user.id;
      const user = await User.findById(userID).select("-passowrd");
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }


  });

module.exports = router;
