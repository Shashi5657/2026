import { Request, Response } from "express";

import * as TaskService from "../services/task.service";

import { catchAsync } from "../utils/catchAsync";

import { sendResponse } from "../utils/sendResponse";

interface TaskParams {
  id: string;
}

export const createTask = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskService.createTask(req.body, req.user.userId);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Task created successfully",
    data: result,
  });
});

export const getTasks = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskService.getTasks(req.user.userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Tasks fetched successfully",
    data: result,
  });
});

export const toggleTask = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskService.toggleTask(
    req.params.id as string,
    req.user.userId,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Task updated successfully",
    data: result,
  });
});

export const deleteTask = catchAsync(async (req: Request, res: Response) => {
  await TaskService.deleteTask(req.params.id as string, req.user.userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Task deleted successfully",
  });
});

export const updateTask = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskService.updateTask(
    req.params.id as string,
    req.user.userId,
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Task updated successfully",
    data: result,
  });
});

export const getTaskById = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskService.getTaskById(
    req.params.id as string,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Task details fetched successfully",
    data: result,
  });
});
