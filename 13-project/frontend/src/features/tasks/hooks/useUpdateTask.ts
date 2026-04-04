import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskApi } from "../api/taskApi";

export const useUpdateTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};
