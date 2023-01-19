const { Router } = require("express");
const userController = Router();
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/User.models");

// Signup
const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  //   console.log(user);

  if (user) {
    res.send({ Message: "User already exists" });
  } else {
    bcrypt.hash(password, 8, async (err, hash) => {
      if (err) {
        res.send({ Message: "Something went wrong" });
      }

      const new_user = new UserModel({
        email,
        password: hash,
      });

      try {
        await new_user.save();
        res.send({ Message: "Signup successful" });
      } catch (err) {
        res.send({ Message: "Somthing Went Wrong" });
      }
    });
  }
};

module.exports = { signup };
