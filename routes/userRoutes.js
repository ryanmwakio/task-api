const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router.get("/users", userController.getAllUsers);

router.get("/user/:userId", userController.getSingleUser);

router.post("/user", userController.postCreateUser);

router.patch("/user/:userId", userController.patchUpdateUser);

router.delete("/user/:userId", userController.deleteUser);

module.exports = router;
