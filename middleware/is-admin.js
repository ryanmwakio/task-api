const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user.role === 1) {
      throw new Error();
    }
    next();
  } catch (err) {
    res.status(401).json({
      state: "error",
      message: "you are not authorized",
    });
  }
};
