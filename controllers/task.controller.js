const Task = require("../models/Task");

exports.renderTask = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.render("tasks", { tasks, user: req.user });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Error fetching tasks." });
  }
};


exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required." });
    }

    const taskStatus = status && ['pending', 'completed'].includes(status) ? status : 'pending';

    const userId = req.user._id; // Get userId from the authenticated user

    const newTask = new Task({
      title,
      description,
      userId,
      status: taskStatus, // Default status is 'pending'
    });

    await newTask.save();
    res.status(201).json({ message: "Task created successfully", task: newTask });
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: "Error creating task" });
  }
};

// get all tasks by user id
exports.getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    if (tasks.length === 0) {
      return res.status(200).json({ message: "No tasks found. You should create a task." });
    }
    res.status(200).json({ tasks });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Error fetching tasks." });
  }
};

// get a specific task by id
exports.getATaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }
    res.status(200).json({ task });
  } catch (err) {
    console.error("Error fetching task:", err);
    res.status(500).json({ error: "Error fetching task." });
  }
};



exports.updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (status && !['pending', 'completed'].includes(status)) {
      return res.status(400).json({ error: "Invalid status value. Only 'pending' or 'completed' are allowed." });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id, 
      { title, description, status },
      { new: true, runValidators: true } 
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ error: "Error updating task." });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully." });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Error deleting task." });
  }
};
