import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toggleTaskApi } from "../api/taskApi";

export const useToggleTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleTaskApi,

    onMutate: async (taskId: string) => {
      await queryClient.cancelQueries({
        queryKey: ["tasks"],
      });

      const previousTasks = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(["tasks"], (old: any) => {
        if (!old?.data) return old;

        return {
          ...old,

          data: old.data.map((task: any) =>
            task.id === taskId
              ? {
                  ...task,
                  completed: !task.completed,
                }
              : task,
          ),
        };
      });

      return {
        previousTasks,
      };
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
