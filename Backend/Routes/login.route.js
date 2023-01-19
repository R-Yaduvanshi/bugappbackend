const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const express = require("express");
const { UserModel } = require("../models/User.models");
const app = express();
app.use(express.json());

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    res.send({ Message: "User not found, Signup please" });
  } else {
    const hash_password = user.password;

    const generated_token = jwt.sign(
      { userID: user._id },
      process.env.SECRET_KEY
    );

    bcrypt.compare(password, hash_password, (err, result) => {
      if (err) {
        res.send({ Message: "Something went Wrong" });
        console.log(err);
      }
      if (result == true) {
        res.send({
          Message: "Login Successfull",
          token: generated_token,
        });
      }
      if (result === false) {
        res.send({ Message: "Wrong password" });
      }
    });
  }
};

module.exports = { login };
