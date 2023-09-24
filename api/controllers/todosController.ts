import db from "../utils/db.js";
import { handleErrors, queryAllTodos } from "../utils/helpers.js";
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from "express";

const getAllTodos = async (req: Request, res: Response) => {
  const { uid } = req.body.user;
  try {
    const conn = await db.getConnection();
    const rows = await queryAllTodos(conn, uid);
    conn.release();
    res.json(rows);
  } catch (err) {
    handleErrors(res, err);
  }
};

const createTodo = async (req: Request, res: Response) => {
  const { text } = req.body;
  const { uid } = req.body.user;
  if (!text || text.trim().length < 3 || text.trim().length >= 20) {
    return res.status(400).json({ message: "Invalid length" });
  }

  try {
    const conn = await db.getConnection();
    const result = await conn.query(
      "INSERT INTO todos (id, text, completed, uid) VALUES (?, ?, ?, ?)",
      [uuidv4(), text, false, uid]
    );
    const rows = await queryAllTodos(conn, uid);
    conn.release();
    res.status(201).json(rows);
  } catch (err) {
    handleErrors(res, err);
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const uid = req.body.uid;
  
  if (!id) {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    const conn = await db.getConnection();
    console.log('id: ', id, 'uid: ', uid)
    const result = await conn.query("DELETE FROM todos WHERE id = ? AND uid = ?", [id, uid]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const rows = await queryAllTodos(conn, uid);

    conn.release();

    res.json(rows);
  } catch (err) {
    handleErrors(res, err);
  }
};

const changeTodo = async (req: Request, res: Response) => {
  const { id, text } = req.body;
  const {uid} = req.body.user;

  if (!id) {
    return res.status(400).json({ message: "Invalid data" });
  }
  console.log('CHANGE TODO body from backend:', id, text, uid)

  try {
    const conn = await db.getConnection();
    const todo = await conn.query("SELECT * FROM todos WHERE id = ?", [id]);

    if (todo.length === 0) {
      conn.release();
      return res.status(404).json({ message: "Todo not found" });
    }

    if (text === undefined) {
      await conn.query("UPDATE todos SET completed = !completed WHERE id = ?", [
        id,
      ]);
    } else {
      await conn.query("UPDATE todos SET text = ? WHERE id = ?", [text, id]);
    }

    const rows = await queryAllTodos(conn, uid);
    conn.release();

    res.json(rows);
  } catch (err) {
    handleErrors(res, err);
  }
};

export { getAllTodos, createTodo, deleteTodo, changeTodo };