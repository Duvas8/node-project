require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('../models/userModel')

const router = express.Router();

const urlUser = 'http://localhost:8000/users';

router.route('/login').post(async (req, res) => {
  const { username, email } = req.body;

  try {
    // Check if the provided username and email exist in the jsonplaceholder API
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const {data:users} = response;
    const user = users.find((user) => user.username === username && user.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    
    const accessTokenPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
     
    };
    
    const accessToken = jwt.sign(accessTokenPayload, process.env.ACCESS_SECRET_TOKEN);
    res.json({ accessToken: accessToken} );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





module.exports = router;


