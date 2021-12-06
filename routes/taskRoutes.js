const express = require("express");

const taskController = require("../controllers/taskController");

const router = express.Router();

router.get("/tasks", taskController.getAllTasks);

router.post("/task", taskController.postCreateTask);

router.get("/task/:taskId", taskController.getSingleTask);

module.exports = router;
