const Task = require("../models/Task");

exports.renderTask = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.render("tasks", { tasks, user: req.user });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).render('error', { 
      error: "Error fetching tasks.", 
      user: req.user 
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description) {
      return res.status(400).redirect('/tasks');
    }

    const taskStatus = status && ['pending', 'In progress', 'completed'].includes(status) 
      ? status 
      : 'pending';

    const newTask = new Task({
      title,
      description,
      userId: req.user._id,
      status: taskStatus
    });

    await newTask.save();
    res.redirect('/tasks');
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).redirect('/tasks');
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    // Validate status
    const validStatuses = ['pending', 'In progress', 'completed'];
    const sanitizedStatus = validStatuses.includes(status) ? status : 'pending';

    // Find and update the task, ensuring it belongs to the current user
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId: req.user._id }, 
      { 
        title, 
        description, 
        status: sanitizedStatus 
      },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).redirect('/tasks');
    }

    res.redirect('/tasks');
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).redirect('/tasks');
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find and delete the task, ensuring it belongs to the current user
    const deletedTask = await Task.findOneAndDelete({ 
      _id: id, 
      userId: req.user._id 
    });

    if (!deletedTask) {
      return res.status(404).redirect('/tasks');
    }

    res.redirect('/tasks');
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).redirect('/tasks');
  }
};