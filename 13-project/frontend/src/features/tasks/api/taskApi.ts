import { axiosInstance } from "@/api/axiosInstance";

export const getTasksApi = async () => {
  const response = await axiosInstance.get("/tasks");

  return response.data;
};

export const createTaskApi = async (payload: {
  title: string;
  description?: string;
}) => {
  const response = await axiosInstance.post("/tasks", payload);
  return response.data;
};

export const toggleTaskApi = async (taskId: string) => {
  const response = await axiosInstance.patch(`/tasks/${taskId}/toggle`);
  return response.data;
};

export const deleteTaskApi = async (taskId: string) => {
  const response = await axiosInstance.delete(`/tasks/${taskId}`);
  return response.data;
};

export const updateTaskApi = async ({
  taskId,
  payload,
}: {
  taskId: string;
  payload: {
    title: string;
    description?: string;
  };
}) => {
  const response = await axiosInstance.patch(`/tasks/${taskId}`, payload);
  return response.data;
};
