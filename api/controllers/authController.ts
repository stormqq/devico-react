import db from "../utils/db.ts";
import { generateTokens, handleErrors } from "../utils/helpers.ts";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.ts";

const registerUser = async (req: Request, res: Response) => {
  try {
    await db.connectMongo();
    console.log(req.body);
    const { email, login, password } = req.body;
    if (!email || !login || !password) {
      return res.status(400).json({ message: "Some data is missing" });
    }

    const userExist = await User.findOne({
      $or: [{ email: email }, { login: login }],
    })

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = new User({
      email,
      login,
      password: hashedPassword,
    });

    const newUser = await createdUser.save();
    console.log("User created");

    const { accessToken, refreshToken } = generateTokens({
      userId: newUser._id.toString(),
      email: newUser.email,
      login: newUser.login,
    });
    
    res
      .status(201)
      .json({
        user: newUser,
        accessToken,
        refreshToken,
      });
  } catch (err) {
    handleErrors(res, err);
  }
};

const loginUser = async (req: Request, res: Response) => {
  console.log("req.headers: ", req.headers);
  const { login, password } = req.body;
  try {
    await db.connectMongo();

    const userExist = await User.findOne({ login: login });

    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, userExist.password);

    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = generateTokens({
      userId: userExist._id.toString(),
      email: userExist.email,
      login: userExist.login,
    });

    res.status(200).json({
      user: userExist,
      accessToken,
      refreshToken,
    });

  } catch (err) {
    handleErrors(res, err);
  }
};

const getUser = async (req: Request, res: Response) => {
  res.json({ user: req.body.user, tokens: req.body.tokens });
};

export { registerUser, loginUser, getUser };
