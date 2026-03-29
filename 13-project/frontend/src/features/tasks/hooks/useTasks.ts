import { useQuery } from "@tanstack/react-query";
import { getTasksApi } from "../api/taskApi";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasksApi,
  });
};
