import express from "express";
import { registerUserController } from "../controllers/register.controller.js";
import { registerUser } from "../usecases/register.usecase.js";
import { createUserRepository } from "../repository/user.repository.js";
import { UserModel } from "../frameworks/mongo.js";
import { hashPassword } from "../services/password.service.js";
import { signJWT } from "../services/token.service.js";

const router = express.Router();

const userRepo = createUserRepository(UserModel);

router.post(
  "/register",
  registerUserController(registerUser({ userRepo, hashPassword }))
);

router.post(
  "/login",
  loginController(loginUser({ userRepo, comparePassword, signJWT }))
);

export { router };
