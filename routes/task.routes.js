const express = require("express");
const router = express.Router();
const methodOverride = require('method-override');
const taskController = require("../controllers/task.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Use method override to support PUT and DELETE methods in forms
router.use(methodOverride('_method'));

// Render the tasks page
router.get("/", authMiddleware, taskController.renderTask);

// Create a new task
router.post('/', authMiddleware, taskController.createTask);

// Update a task
router.put('/:id', authMiddleware, taskController.updateTask);

// Delete a task
router.delete("/:id", authMiddleware, taskController.deleteTask);

module.exports = router;