import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTaskApi } from "../api/taskApi";

export const useDeletetasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};
