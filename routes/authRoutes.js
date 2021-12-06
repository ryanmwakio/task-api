const express = require("express");

const authController = require("../controllers/authController");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/login", authController.postLogin);

router.post("/signup", authController.postSignup);

router.post("/logout", isAuth, authController.postLogOut);

module.exports = router;
