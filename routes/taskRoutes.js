const express = require("express");

const taskController = require("../controllers/taskController");

const router = express.Router();

router.get("/tasks", taskController.getAllTasks);

router.post("/task", taskController.postCreateTask);

module.exports = router;
