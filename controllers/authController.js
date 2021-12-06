const User = require("../models/User");

const bcrypt = require("bcryptjs");

const generateJwtToken = require("../util/generateJwtToken");

exports.postLogin = async (req, res, next) => {
  try {
    const emailFromBody = req.body.email;
    const passwordFromBody = req.body.password;

    if (!emailFromBody || !passwordFromBody) {
      return res.status(400).json({
        state: "error",
        message: "ensure you provide both email and password",
      });
    }

    const user = await User.findOne({ email: emailFromBody });

    if (!user) {
      return res.status(404).json({
        state: "error",
        message: "invalid email or password",
      });
    }

    const doPasswordsMatch = await bcrypt.compare(
      passwordFromBody,
      user.password
    );

    if (!doPasswordsMatch) {
      return res.status(403).json({
        state: "error",
        message: "invalid email or password",
      });
    }

    const token = generateJwtToken(user._id);

    user.tokens = user.tokens.concat({ token: token });
    await user.save();

    return res.status(200).json({
      state: "success",
      message: "login successfully",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      state: "error",
      message: "an error occurred while trying to login",
    });
  }
};

exports.postSignup = async (req, res, next) => {
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

    const token = generateJwtToken(newUser._id);
    newUser.tokens = newUser.tokens.concat({ token: token });
    await newUser.save();

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

exports.postLogOut = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((item) => {
      return item.token !== req.token;
    });
    await req.user.save();

    return res.status(200).json({
      state: "success",
      message: "successfully logged out",
    });
  } catch (err) {
    return res.status(500).json({
      state: "error",
      message: "an error occurred while trying to logout",
    });
  }
};
