import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleTaskApi } from "../api/taskApi";

export const useToggleTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};
