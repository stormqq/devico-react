const db = require("../utils/db");
const { handleErrors, queryAllTodos } = require("../utils/helpers");

const selectAllTodos = async (req, res) => {
  try {
    const conn = await db.getConnection();
    const todos = await conn.query("SELECT * FROM todos");

    const allTodosCompleted = todos.every((todo) => todo.completed);

    if (allTodosCompleted) {
      await conn.query("UPDATE todos SET completed = false");
    } else {
      await conn.query("UPDATE todos SET completed = true");
    }

    const rows = await queryAllTodos(conn);

    conn.release();

    res.json(rows);
  } catch (err) {
    handleErrors(res, err);
  }
};

const deleteAllCompletedTodos = async (req, res) => {
  try {
    const conn = await db.getConnection();
    const completedCount = await conn.query(
      "SELECT COUNT(*) AS count FROM todos WHERE completed = 1"
    );

    if (completedCount[0].count === 0) {
      conn.release();
      return res.status(400).json({ message: "No completed todos to delete" });
    }

    await conn.query("DELETE FROM todos WHERE completed = true");

    const rows = await queryAllTodos(conn);

    conn.release();

    res.json(rows);
  } catch (err) {
    handleErrors(res, err);
  }
};

module.exports = { selectAllTodos, deleteAllCompletedTodos };
