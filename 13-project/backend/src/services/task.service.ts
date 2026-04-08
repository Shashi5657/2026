import { prisma } from "../config/database";
import { CreateTaskPayload } from "../types/task.type";
import { AppError } from "../utils/AppError";

export const createTask = async (paylod: CreateTaskPayload, userId: string) => {
  return prisma.task.create({
    data: {
      title: paylod.title,
      description: paylod.description,
      dueDate: paylod.dueDate,
      userId,
    },
  });
};

export const getTasks = async (userId: string) => {
  return prisma.task.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const toggleTask = async (taskId: string, userId: string) => {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  return prisma.task.update({
    where: {
      id: taskId,
    },

    data: {
      completed: !task.completed,
    },
  });
};

export const deleteTask = async (taskId: string, userId: string) => {
  return prisma.task.deleteMany({
    where: {
      id: taskId,
      userId,
    },
  });
};

export const updateTask = async (
  taskId: string,
  userId: string,
  paylod: { title: string; description?: string; dueDate?: string },
) => {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!task) {
    throw new AppError(404, "Task not found");
  }
  return prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      title: paylod.title,
      description: paylod?.description,
      dueDate: paylod?.dueDate,
    },
  });
};
