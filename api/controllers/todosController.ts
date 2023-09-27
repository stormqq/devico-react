import db from "../utils/db.js";
import { handleErrors } from "../utils/helpers.js";
import { Request, Response } from "express";
import Todo from "../models/todo.ts";

const getAllTodos = async (req: Request, res: Response) => {
  const { userId } = req.body.user;
  try {
    await db.connectMongo();
    const todos = await Todo.find({ user: userId });
    console.log('getAllTodos UID: ', userId)
    console.log('getting all todos:', todos)
    res.json(todos);
  } catch (err) {
    handleErrors(res, err);
  }
};

const createTodo = async (req: Request, res: Response) => {
  const { text } = req.body;
  const { userId } = req.body.user;
  if (!text || text.trim().length < 3 || text.trim().length >= 20) {
    return res.status(400).json({ message: "Invalid length" });
  }

  try {
    await db.connectMongo();
    const todo = new Todo({
      text,
      completed: false,
      user: userId,
    });
    await todo.save();
    const todos = await Todo.find({ user: userId });
    res.status(201).json(todos);
  } catch (err) {
    handleErrors(res, err);
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body.user;
  
  if (!id) {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    await db.connectMongo();
    const todo = await Todo.findOneAndDelete({ _id: id, user: userId });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    const todos = await Todo.find({ user: userId });
    res.json(todos);
  } catch (err) {
    handleErrors(res, err);
  }
};

const changeTodo = async (req: Request, res: Response) => {
  const { id, text } = req.body;
  const { userId } = req.body.user;

  if (!id) {
    return res.status(400).json({ message: "Invalid data" });
  }
  console.log('CHANGE TODO body from backend:', id, text, userId)

  try {
    await db.connectMongo();

    const todoExist = await Todo.findOne({ _id: id, user: userId });
    if (!todoExist) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (text) {
      await Todo.updateOne({ _id: id, user: userId}, { text: text });
    } else {
      await Todo.updateOne({ _id: id, user: userId }, { completed: !todoExist.completed });
    }
    const todos = await Todo.find({ user: userId });
    res.json(todos);
  } catch (err) {
    handleErrors(res, err);
  }
};

export { getAllTodos, createTodo, deleteTodo, changeTodo };