import bcrypt from "bcrypt";

import { prisma } from "../config/database";
import { AppError } from "../utils/AppError";

import { LoginPayload, SignupPayload } from "../types/auth.types";
import { createAccessToken } from "../utils/jwt";
import { email } from "zod";

export const signup = async (payload: SignupPayload) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existingUser) {
    throw new AppError(409, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });
  return user;
};

export const login = async (paylod: LoginPayload) => {
  const user = await prisma.user.findUnique({
    where: {
      email: paylod.email,
    },
  });
  if (!user) {
    throw new AppError(401, "Invalid credentials");
  }

  const passwordMatched = await bcrypt.compare(paylod.password, user.password);

  if (!passwordMatched) {
    throw new AppError(401, "Invalid credentials");
  }

  const accessToken = createAccessToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    accessToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
