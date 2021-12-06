const express = require("express");

const taskController = require("../controllers/taskController");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/tasks", isAuth, isAuth, taskController.getAllTasks);

router.post("/task", isAuth, taskController.postCreateTask);

router.get("/task/:taskId", isAuth, taskController.getSingleTask);

router.patch("/task/:taskId", isAuth, taskController.patchUpdateTask);

router.delete("/task/:taskId", isAuth, taskController.deleteTask);

module.exports = router;
