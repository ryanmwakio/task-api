const User = require("../models/User");

exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();

    return res.status(200).json({
      state: "success",
      message: "all users fetched successfully",
      data: allUsers,
    });
  } catch (err) {
    return res.status(500).json({
      state: "error",
      message: "an error occurred while getting users",
    });
  }
};

exports.getSingleUser = (req, res, next) => {};

exports.postCreateUser = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const isNameInDatabase = await User.find({ name: name });

    if (isNameInDatabase.length > 0) {
      return res.status(401).json({
        state: "error",
        message: "cannot use name, the name is already taken",
      });
    }

    const isEmailInDatabase = await User.find({ email: email });
    if (isEmailInDatabase.length > 0) {
      return res.status(401).json({
        state: "error",
        message: "sorry the email already in use",
      });
    }

    const newUser = await new User({
      name: name,
      email: email,
      password: password,
    }).save();

    return res.status(201).json({
      state: "success",
      message: "user created successfully",
      data: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      state: "error",
      message: err.message,
    });
  }
};