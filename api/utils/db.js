const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "test123",
  database: "todosapp",
});

module.exports = {
  getConnection: async () => {
    try {
      const conn = await pool.getConnection();
      return conn;
    } catch (err) {
      console.error("Error getting a database connection:", err);
      throw err;
    }
  },
};
