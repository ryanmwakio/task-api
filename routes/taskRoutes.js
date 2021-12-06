const express = require("express");

const taskController = require("../controllers/taskController");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/tasks", isAuth, taskController.getAllTasks);

router.post("/task", taskController.postCreateTask);

router.get("/task/:taskId", taskController.getSingleTask);

router.patch("/task/:taskId", taskController.patchUpdateTask);

router.delete("/task/:taskId", taskController.deleteTask);

module.exports = router;
