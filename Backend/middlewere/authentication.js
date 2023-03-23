const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User.models");
const { blackList } = require("../config/blacklist");
require("dotenv").config();
const authMiddlewere = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (blackList.includes(authHeader)) {
      return res.send({ message: "Login please" });
    }
    if (!authHeader) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const token = authHeader.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await UserModel.findById(decodedToken.userId);

    if (!user) {
      return res.status(400).send({ error: "User Not Found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("===>>>", err);
    res.status(401).send({ error: "Authentication failed" });
  }
};

module.exports = { authMiddlewere };
