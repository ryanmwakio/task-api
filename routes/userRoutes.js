const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router.get("/users", userController.getAllUsers);

router.get("/user/:userId", userController.getSingleUser);

router.post("/user", userController.postCreateUser);

module.exports = router;
