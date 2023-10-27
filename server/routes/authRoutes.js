const express = require("express");
const authRouter = express.Router();
const { login, regsiter ,verify} = require("../controller/authController"); // Import separate functions for login and register


authRouter.post("/register", regsiter);
authRouter.post("/login", login);
authRouter.post("/verify", verify);
module.exports = authRouter; 