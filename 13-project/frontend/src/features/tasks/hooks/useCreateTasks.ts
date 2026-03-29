import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTaskApi } from "../api/taskApi";

export const useCreateTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};
