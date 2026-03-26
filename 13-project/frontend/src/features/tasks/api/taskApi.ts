import { axiosInstance } from "@/api/axiosInstance";

export const getTasksApi = async () => {
  const response = await axiosInstance.get("/tasks");

  return response.data;
};

export const createTaskApi = async (payload: {
  title: string;
  description: string;
}) => {
  const response = await axiosInstance.post("/tasks", payload);
  return response.data;
};
