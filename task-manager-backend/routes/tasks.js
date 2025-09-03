//routes tasks.js

import express from "express";
import Task from "../models/Task.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all tasks
router.get("/", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

// Add task
router.post("/", authMiddleware, async (req, res) => {
  const { title } = req.body;
  const task = new Task({ title, userId: req.userId });
  await task.save();
  res.json(task);
});

// Update task
router.put("/:id", authMiddleware, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  res.json(task);
});

// Delete task
router.delete("/:id", authMiddleware, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: "Task deleted" });
});

// Toggle task status
router.patch("/:id/toggle", authMiddleware, async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
  task.completed = !task.completed;
  await task.save();
  res.json(task);
});

export default router;