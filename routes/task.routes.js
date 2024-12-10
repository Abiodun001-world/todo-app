const express = require("express");
const router = express.Router();
const { renderTask, createTask, updateTask, deleteTask } = require("../controllers/task.controller");
const taskController = require("../controllers/task.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Render the tasks page
router.get("/", authMiddleware, renderTask);

// Create a new task
router.post('/', authMiddleware, taskController.createTask);
// Get all tasks
router.get('/:id', authMiddleware, taskController.getAllTask);
// Get a specific task by id
router.get('/:id', authMiddleware, taskController.getATaskById);
// Update the all the task status and the task details
router.put('/:id', authMiddleware, taskController.updateTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;
