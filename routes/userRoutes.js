const express = require("express");

const userController = require("../controllers/userController");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/users", userController.getAllUsers);

router.get("/user/me", isAuth, userController.getMyProfile);

router.patch("/user/me", isAuth, userController.patchUpdateMyProfile);

router.delete("/user/me", isAuth, userController.deleteMyProfile);

module.exports = router;
