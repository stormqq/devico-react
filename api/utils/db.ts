import mariadb, { PoolConnection } from "mariadb";

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "test123",
  database: "todosapp",
});

export default {
  getConnection: async (): Promise<PoolConnection> => {
    try {
      const conn = await pool.getConnection();
      return conn;
    } catch (err) {
      console.error("Error getting a database connection:", err);
      throw err;
    }
  },
};