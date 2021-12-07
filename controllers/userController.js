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

exports.getMyProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
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

exports.patchUpdateMyProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;

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
      message: "successfully updated the user",
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

exports.deleteMyProfile = async (req, res, next) => {
  const userId = req.user._id;

  const userDestroyed = await User.findByIdAndRemove(userId);

  return res.status(201).json({
    state: "success",
    message: "successfully deleted the user",
    data: userDestroyed,
  });
};
