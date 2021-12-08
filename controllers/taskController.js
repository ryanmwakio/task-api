const Task = require("../models/Task");
const User = require("../models/User");

exports.getAllTasksForProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    await user.populate("tasks");

    return res.status(200).json({
      state: "success",
      message: "successfully fetched tasks",
      data: user.tasks,
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
    const userDataAndtasks = await User.findById(req.user._id).populate(
      "tasks"
    );

    const tasks = userDataAndtasks.tasks;

    const task = tasks.filter((task) => {
      return String(task._id) === String(taskId);
    });

    if (task.length === 0) {
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
      message:
        "an error occurred while trying to fetch user, ensure you provide a proper user id",
    });
  }
};

exports.postCreateTask = async (req, res, next) => {
  try {
    const description = req.body.description;

    if (!description) {
      return res.json({
        state: "error",
        message:
          "error make sure you provide the description before submitting",
      });
    }

    const task = await new Task({
      ...req.body,
      owner: req.user._id,
    });
    const newTask = await task.save();

    req.user.tasks = [...req.user.tasks, newTask._id];
    await req.user.save();

    return res.status(201).json({
      state: "success",
      message: "successfully created the task",
      data: newTask,
    });
  } catch (err) {
    return res.status(500).json({
      state: "error",
      message: "an error occurred while trying to add new task",
    });
  }
};

exports.patchUpdateTask = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;

    const task = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({
        state: "error",
        message: "sorry the user does not exist",
      });
    }

    return res.status(201).json({
      state: "success",
      message: "successfully update the task",
      data: task,
    });
  } catch (err) {
    res.status(500).json({
      state: "error",
      message: "an error occurred while trying to update task",
    });
  }
};

exports.deleteTask = async (req, res, next) => {
  const taskId = req.params.taskId;

  const taskDestroyed = await Task.findByIdAndRemove(taskId);

  return res.status(201).json({
    state: "success",
    message: "successfully deleted the task",
    data: taskDestroyed,
  });
};
