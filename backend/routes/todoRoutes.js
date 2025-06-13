import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createTodo,
  deleteTodo,
  getTodos,
  toggleTodoComplete,
  updateTodo,
} from "../controllers/todoController.js";

const router = express.Router();

router.post("/", protect, createTodo);
router.get("/", protect, getTodos);
router.put("/:id", protect, updateTodo);
router.delete("/:id", protect, deleteTodo);
router.patch("/:id/complete", protect, toggleTodoComplete);
export default router;
