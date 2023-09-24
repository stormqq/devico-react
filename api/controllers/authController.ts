import db from "../utils/db.ts";
import { handleErrors, queryAllTodos } from "../utils/helpers.ts";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

const registerUser = async (req: Request, res: Response) => {
  try {
    const conn = await db.getConnection();
    console.log(req.body);
    const { email, login, password } = req.body;
    if (!email || !login || !password) {
      return res.status(400).json({ message: "Some data is missing" });
    }
    const user = await conn.query(
      "SELECT * FROM users WHERE email = ? OR login = ?",
      [email, login]
    );
    if (user.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    const uid = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    await conn.query(
      "INSERT INTO users (uid, email, login, password) VALUES (?, ?, ?, ?)",
      [uid, email, login, hashedPassword]
    );
    console.log("User created");
    const [newUser] = await conn.query("SELECT * FROM users WHERE uid = ?", [
      uid,
    ]);
    const newAccessToken = jwt.sign(
      {
        uid: newUser.uid,
        email: newUser.email,
        login: newUser.login,
      },
      process.env.ACCESS_TOKEN_SECRET || "",
      {
        expiresIn: "2m",
      }
    );
    const newRefreshToken = jwt.sign(
      {
        uid: newUser.uid,
        email: newUser.email,
        login: newUser.login,
      },
      process.env.REFRESH_TOKEN_SECRET || "",
      {
        expiresIn: "7d",
      }
    );
    conn.release();
    res
      .status(201)
      .json({
        user: newUser,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
  } catch (err) {
    handleErrors(res, err);
  }
};

const loginUser = async (req: Request, res: Response) => {
  console.log("req.headers: ", req.headers);
  try {
    const conn = await db.getConnection();
    const { login, password } = req.body;
    const [user] = await conn.query("SELECT * FROM users WHERE login = ?", [
      login,
    ]);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Invalid credentials" });
    }
    const accessToken = jwt.sign(
      {
        uid: user.uid,
        email: user.email,
        login: user.login,
      },
      process.env.ACCESS_TOKEN_SECRET || "",
      { expiresIn: "10s" }
    );
    const refreshToken = jwt.sign(
      {
        uid: user.uid,
        email: user.email,
        login: user.login,
      },
      process.env.REFRESH_TOKEN_SECRET || "",
      { expiresIn: "4h" }
    );
    conn.release();
    res.status(200).json({
      user,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    handleErrors(res, err);
  }
};

const refreshTokens = async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.sendStatus(401);
  }
  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET || ""
  ) as {
    uid: string;
    email: string;
    login: string;
  };
  const newAccessToken = jwt.sign(
    {
      uid: decoded.uid,
      email: decoded.email,
      login: decoded.login,
    },
    process.env.ACCESS_TOKEN_SECRET || "",
    { expiresIn: "10s" }
  );
  const newRefreshToken = jwt.sign(
    {
      uid: decoded.uid,
      email: decoded.email,
      login: decoded.login,
    },
    process.env.REFRESH_TOKEN_SECRET || "",
    { expiresIn: "7d" }
  );

  res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
};

const getUser = async (req: Request, res: Response) => {
  res.json({ user: req.body.user, tokens: req.body.tokens });
};

export { registerUser, loginUser, refreshTokens, getUser };
