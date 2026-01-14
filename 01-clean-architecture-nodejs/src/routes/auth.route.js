import express from "express";
import { registerUserController } from "../controllers/register.controller.js";
import { registerUser } from "../usecases/register.usecase.js";
import { loginUserController } from "../controllers/login.controller.js";
import { loginUser } from "../usecases/login.usecase.js";
import { createUserRepository } from "../repository/user.repository.js";
import { UserModel } from "../frameworks/mongo.js";
import { hashPassword, comparePassword } from "../services/password.service.js";
import { signJWT } from "../services/token.service.js";

const router = express.Router();

const userRepo = createUserRepository(UserModel);

router.post(
  "/register",
  registerUserController(registerUser({ userRepo, hashPassword }))
);

router.post(
  "/login",
  loginUserController(loginUser({ userRepo, comparePassword, signJWT }))
);

export { router };
