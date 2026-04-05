import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTaskApi } from "../api/taskApi";

export const useDeletetasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTaskApi,

    onMutate: async (taskId: string) => {
      await queryClient.cancelQueries({
        queryKey: ["tasks"],
      });

      const previousTasks = await queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(["tasks"], (old: any) => {
        if (!old?.data) return old;

        return {
          ...old,
          data: old.data.filter((task: any) => task.id !== taskId),
        };
      });

      return { previousTasks };
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData(["tasks"], context?.previousTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};
