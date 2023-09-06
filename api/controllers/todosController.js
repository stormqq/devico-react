const db = require("../utils/db");
const { handleErrors, queryAllTodos } = require("../utils/helpers");

const getAllTodos = async (req, res) => {
  try {
    const conn = await db.getConnection();
    const rows = await queryAllTodos(conn);
    conn.release();
    res.json(rows);
  } catch (err) {
    handleErrors(res, err);
  }
};

const createTodo = async (req, res) => {
  const { text } = req.body;
  if (!text || text.trim().length < 3 || text.trim().length >= 20) {
    return res.status(400).json({ message: "Invalid length" });
  }

  try {
    const conn = await db.getConnection();
    const result = await conn.query(
      "INSERT INTO todos (text, completed) VALUES (?, ?)",
      [text, false]
    );
    const rows = await queryAllTodos(conn);
    conn.release();
    res.status(201).json(rows);
  } catch (err) {
    handleErrors(res, err);
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    const conn = await db.getConnection();
    const result = await conn.query("DELETE FROM todos WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const rows = await queryAllTodos(conn);

    conn.release();

    res.json(rows);
  } catch (err) {
    handleErrors(res, err);
  }
};

const changeTodo = async (req, res) => {
  const { id, text } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Invalid data" });
  }

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

    const rows = await queryAllTodos(conn);
    conn.release();

    res.json(rows);
  } catch (err) {
    handleErrors(res, err);
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  deleteTodo,
  changeTodo,
};