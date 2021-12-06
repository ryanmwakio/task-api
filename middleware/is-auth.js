const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    const decoded = jwt.verify(token, "taskapiuniqueidentifier");

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user.length === 0) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      state: "error",
      message: "please authenticate",
    });
  }
};
