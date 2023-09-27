import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
interface TokenPayload {
  userId: string;
  email: string;
  login: string;
}

export const handleErrors = (res: Response, err: Error | unknown): void => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
};

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokens = req.headers["authorization"];
  const accessToken = tokens && tokens.split(" ")[1];
  const refreshToken = tokens && tokens.split(" ")[2];
  console.log(
    "authenticateToken refreshtoken: ",
    refreshToken,
    "accessToken: ",
    accessToken
  );
  if (!accessToken && !refreshToken) {
    return res.status(401).send("Access Denied. No token provided.");
  }

  try {
    console.log("ACCESS TOKEN IS VALID");

    if (accessToken) {
      const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET || ""
      );
      console.log('ACCESS VALID TOKEN DECODED: ', decoded)
      req.body.tokens = { accessToken, refreshToken };
      req.body.user = decoded;
    }
    next();
  } catch (err) {
    console.log("ACCESS TOKEN IS INVALID: ", err);
    if (!refreshToken) {
      return res.status(401).send("No refresh token provided");
    }

    try {
      console.log("REFRESHING TOKENS");
      const response = await refreshTokens(refreshToken);
      res.header(
        "authorization",
        `Bearer ${response.accessToken} ${response.refreshToken}`
      );
      const decoded = jwt.verify(
        response.accessToken,
        process.env.ACCESS_TOKEN_SECRET || ""
      );
      req.body.tokens = response;
      req.body.user = decoded;
      next();
    } catch (err) {
      return res.status(401).send("Invalid refresh token");
    }
  }
};

const refreshTokens = async (
  refreshToken: string
): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET || ""
    ) as TokenPayload;

    const newAccessToken = jwt.sign(
      {
        userId: decoded.userId,
        email: decoded.email,
        login: decoded.login,
      },
      process.env.ACCESS_TOKEN_SECRET || "",
      { expiresIn: "10s" }
    );

    const newRefreshToken = jwt.sign(
      {
        userId: decoded.userId,
        email: decoded.email,
        login: decoded.login,
      },
      process.env.REFRESH_TOKEN_SECRET || "",
      { expiresIn: "7d" }
    );

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

export const generateTokens = (newUser: TokenPayload) => {
  const accessToken = jwt.sign(
    {
      userId: newUser.userId,
      email: newUser.email,
      login: newUser.login,
    },
    process.env.ACCESS_TOKEN_SECRET || "",
    {
      expiresIn: "20s",
    }
  );

  const refreshToken = jwt.sign(
    {
      userId: newUser.userId,
      email: newUser.email,
      login: newUser.login,
    },
    process.env.REFRESH_TOKEN_SECRET || "",
    {
      expiresIn: "7d",
    }
  );

  return { accessToken, refreshToken };
};
