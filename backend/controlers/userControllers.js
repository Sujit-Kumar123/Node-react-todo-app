const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  mongoose = require('mongoose');
const secretKey = 'yourSecretKey'; // Change this to a strong secret key

// Register a new user
async function userRegister(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log("first",req.body.name,req.body.email)
    console.log("first",hashedPassword)
    const user =new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    console.log(user)
    console.log("first")
    await user.save();
    console.log("last")
    res.status(200).send('User registered successfully.');
  } catch (error) {
    res.status(500).send('Error registering user.');
  }
}

// Login and generate a JWT token
async function userLogin(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (user == null) return res.status(404).send('User not found.');
  console.log("first")
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign({ eamil: user.email }, secretKey);
      res.json({ accessToken });
    } else {
      res.status(403).send('Authentication failed.');
    }
  } catch (error) {
    res.status(500).send('Error logging in.');
  }
}
const revokedTokens = [];

// Logout the user by adding the token to the revoked tokens list
function userLogout(req, res) {
  const token = req.body.authorization;
//  console.log("first",token)
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  // Check if the token has already been revoked
  if (revokedTokens.includes(token)) {
    return res.status(401).send('Token has already been revoked');
  }

  // Add the token to the revoked tokens list
  revokedTokens.push(token);
  res.status(200).send('Logout successful');
}

module.exports = {
  userRegister,
  userLogin,
  userLogout,
};
