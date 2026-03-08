import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const createAccessToken = (payload: Record<string, unknown>) => {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
};
