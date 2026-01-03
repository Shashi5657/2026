import express from "express";
import { registerUserController } from "../controllers/register.controller";
import { registerUser } from "../usecases/register.usecase";
import { createUserRepository } from "../repository/user.repository";

const router = express.Router();
const userRepo = createUserRepository(UserModel)

router.post(
  "/register",
  registerUserController(registerUser({ userRepo, hashPassword }))
);
