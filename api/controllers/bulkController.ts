import Todo from "../models/todo.ts";
import db from "../utils/db.ts";
import { handleErrors } from "../utils/helpers.ts";
import { Request, Response } from "express";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const selectAllTodos = async (req: Request, res: Response) => {
  const { userId } = req.body.user;
  try {
    await db.connectMongo();
    const todos = await Todo.find({ user: userId });
    const allTodosCompleted = todos.every((todo) => todo.completed);

    if (allTodosCompleted) {
      await Todo.updateMany({ user: userId }, { completed: false });
    } else {
      await Todo.updateMany({ user: userId}, { completed: true });
    }

    const allTodos = await Todo.find({ user: userId });
    res.json(allTodos);
  } catch (err) {
    handleErrors(res, err);
  }
};

const deleteAllCompletedTodos = async (req: Request, res: Response) => {
  const { userId } = req.body.user;
  try {
    await db.connectMongo();
    await Todo.deleteMany({ user: userId, completed: true });
    const todos = await Todo.find({ user: userId });
    res.json(todos);
  } catch (err) {
    handleErrors(res, err);
  }
};

export { selectAllTodos, deleteAllCompletedTodos };