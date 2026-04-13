import { useQuery } from "@tanstack/react-query";

import { getTaskByIdApi } from "../api/taskApi";

export const useTask = (taskId: string) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskByIdApi(taskId),
  });
};
