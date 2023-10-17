const User = require('../models/userModel');
const UserToken = require('../models/userTokenModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const secretKey = 'yourSecretKey'; // Change this to a strong secret key

// Register a new user
async function userRegister(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // console.log("first",req.body.name,req.body.email)
    // console.log("first",hashedPassword)
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    // console.log(user)
    // console.log("first")
    await user.save();
    // console.log("last")
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
      const userToken = new UserToken({
        token: accessToken,
        userId: user._id,
      })
      await userToken.save()
      res.json({ accessToken });
    } else {
      res.status(403).send('Authentication failed.');
    }
  } catch (error) {
    res.status(500).send('Error logging in.');
  }
}

async function userLogout(req, res) {
  const token = req.body.authorization;
  console.log("Token to be revoked:", token);

  try {
    if (!token) {
      return res.status(401).send('Unauthorized');
    }

    const result = await UserToken.deleteOne({ token: token });
    // console.log("first",result)
    if (result.deletedCount === 0) {
      return res.status(401).send('Unauthorized User');
    } else {
      return res.status(200).send('Logout successful');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
module.exports = {
    userRegister,
    userLogin,
    userLogout,
  };
