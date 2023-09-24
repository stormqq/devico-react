import db from "../utils/db.ts";
import { handleErrors, queryAllTodos } from "../utils/helpers.ts";
import { Request, Response } from "express";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const selectAllTodos = async (req: Request, res: Response) => {
  const { uid } = req.body;
  try {
    const conn = await db.getConnection();
    const todos: Todo[] = await queryAllTodos(conn, uid);

    const allTodosCompleted = todos.every((todo) => todo.completed);

    if (allTodosCompleted) {
      await conn.query("UPDATE todos SET completed = false WHERE uid = ?", [uid]);
    } else {
      await conn.query("UPDATE todos SET completed = true WHERE uid = ?", [uid]);
    }

    const rows = await queryAllTodos(conn, uid);

    conn.release();

    res.json(rows);
  } catch (err) {
    handleErrors(res, err);
  }
};

const deleteAllCompletedTodos = async (req: Request, res: Response) => {
  const { uid } = req.params;
  try {
    const conn = await db.getConnection();
    const completedCount = await conn.query(
      "SELECT COUNT(*) AS count FROM todos WHERE completed = 1 AND uid = ?", [uid]
    );

    if (completedCount[0].count === 0) {
      conn.release();
      return res.status(400).json({ message: "No completed todos to delete" });
    }

    await conn.query("DELETE FROM todos WHERE completed = 1 AND uid = ?", [uid]);

    const rows = await queryAllTodos(conn, uid);

    conn.release();

    res.json(rows);
  } catch (err) {
    handleErrors(res, err);
  }
};

export { selectAllTodos, deleteAllCompletedTodos };