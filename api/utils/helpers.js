const handleErrors = (res, err) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
};

const queryAllTodos = async (conn) => {
  try {
    const rows = await conn.query("SELECT * FROM todos");
    return rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  handleErrors,
  queryAllTodos,
};
