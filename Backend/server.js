const express = require("express");
const { signup } = require("./Routes/signup.route");
const { connection } = require("./config/db");
const { login } = require("./Routes/login.route");
const { blackList } = require("./config/blacklist");
const cors = require("cors");
const { authMiddlewere } = require("./middlewere/authentication");
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
require("dotenv").config();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Welcome To Bug Tracker App");
});

// Signup Route

app.post("/signup", signup);

// Login Route

app.post("/login", login);

// Protected Route

app.get("/users", authMiddlewere, (req, res) => {
  res.send("users........");
});

// Logout

app.get("/logout", (req, res) => {
  blackList.push(req.headers?.authorization);
  res.send({ message: "Logout Success" });
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connection to db successfull");
  } catch (err) {
    console.log("Connecting to db unsuccessfull");
    console.log(err);
  }
  console.log(`App listen on Port Number ${PORT}`);
});
