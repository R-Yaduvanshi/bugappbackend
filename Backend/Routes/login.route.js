const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const express = require("express");
const { UserModel } = require("../models/User.models");
const app = express();
app.use(express.json());

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    // create a jwt
    const jwtToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.send({ message: "Login Succesfull", jwtToken });
  } catch (err) {
    // next(err);
    console.log(err);
  }
};

module.exports = { login };
