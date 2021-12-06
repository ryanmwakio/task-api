const bcrypt = require("bcryptjs");

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

exports.getSingleUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        state: "error",
        message: "sorry, the user does not exist",
      });
    }

    return res.status(200).json({
      state: "success",
      message: "successfully found the user",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      state: "error",
      message: err.message,
    });
  }
};

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

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await new User({
      name: name,
      email: email,
      password: hashedPassword,
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

exports.patchUpdateUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        state: "error",
        message: "sorry the user does not exist",
      });
    }

    return res.status(201).json({
      state: "success",
      message: "successfully update the user",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      state: "error",
      message:
        "an error occurred while trying to update the user, ensure you have proper user id and data values submitted",
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;

  const userDestroyed = await User.findByIdAndRemove(userId);

  return res.status(201).json({
    state: "success",
    message: "successfully deleted the user",
    data: userDestroyed,
  });
};
