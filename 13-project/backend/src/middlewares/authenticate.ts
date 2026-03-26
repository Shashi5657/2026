import { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/AppError";

import { verifyAccessToken } from "../utils/jwt";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new AppError(401, "Authorization token missing");
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    throw new AppError(401, "Invalid token format");
  }

  try {
    const decoded = verifyAccessToken(token) as {
      userId: string;
      email: string;
      role: string;
    };

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role as any,
    };

    next();
  } catch (error) {
    throw new AppError(401, "Invalid or expired token");
  }
};
