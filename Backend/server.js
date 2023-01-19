const express = require("express");
const { signup } = require("./Routes/signup.route");
const { connection } = require("./config/db");
const { login } = require("./Routes/login.route");
const cors = require("cors");
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
