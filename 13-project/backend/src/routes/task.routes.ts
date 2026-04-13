import { Router } from "express";

import * as TaskController from "../controllers/task.controller";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.use(authenticate);

router.post("/", TaskController.createTask);

router.get("/", TaskController.getTasks);

router.get("/:id", TaskController.getTaskById)

router.patch("/:id/toggle", TaskController.toggleTask);

router.patch("/:id", TaskController.updateTask)

router.delete("/:id", TaskController.deleteTask);

export default router;
