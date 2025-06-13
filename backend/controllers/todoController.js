import { TodoModel } from "../models/Todo.js";
import {
  createTodoValidation,
  updateTodoValidation,
} from "../validations/todoValidation.js";

export const createTodo = async (req, res) => {
  const { error } = createTodoValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const { title, description } = req.body;
    const newTodo = await TodoModel.create({
      user: req.user._id,
      title,
      description,
    });
    return res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await TodoModel.find({ user: req.user._id });
    return res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  const { error } = updateTodoValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const todo = await TodoModel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    todo.title = req.body.title || todo.title;
    todo.description = req.body.description || todo.description;
    todo.isCompleted = req.body.isCompleted || todo.isCompleted;

    const updatedTodo = await todo.save();
    return res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await TodoModel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    await todo.deleteOne();
    return res.status(200).json({
      message: "Todo deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleTodoComplete = async (req, res) => {
  try {
    const todo = await TodoModel.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    todo.isCompleted = !todo.isCompleted;
    const updatedTodo = await todo.save();

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
