import { PoolConnection } from "mariadb";
import { Response } from "express";
export const handleErrors = (res: Response, err: Error | unknown): void => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
};

export const queryAllTodos = async (conn: PoolConnection) => {
  try {
    const rows = await conn.query("SELECT * FROM todos");
    return rows;
  } catch (err) {
    throw err;
  }
};


