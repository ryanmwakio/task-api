const Task = require("../models/Task");

exports.getAllTasks = async (req, res, next) => {
  try {
    const allTasks = await Task.find();
    return res.status(200).json({
      state: "success",
      message: "successfully fetched tasks",
      data: allTasks,
    });
  } catch (err) {
    return res.status(500).json({
      state: "error",
      message: err.message,
    });
  }
};

exports.getSingleTask = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        state: "error",
        message: "sorry, could not find this particular task",
      });
    }

    return res.status(200).json({
      state: "success",
      message: "successfully fetched the task",
      data: task,
    });
  } catch (err) {
    return res.status(500).json({
      state: "error",
      message: err.message,
    });
  }
};

exports.postCreateTask = async (req, res, next) => {
  try {
    const description = req.body.description;
    const completed = req.body.completed;

    if (!description) {
      return res.json({
        state: "error",
        message:
          "error make sure you provide the description before submitting",
      });
    }

    const task = await new Task({
      description: description,
      completed: completed,
    });

    const newTask = await task.save();
    return res.status(201).json({
      state: "success",
      message: "successfully created the task",
      data: newTask,
    });
  } catch (err) {
    return res.status(500).json({
      state: "error",
      message: err.message,
    });
  }
};
