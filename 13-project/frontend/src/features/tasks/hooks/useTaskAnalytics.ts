import { useMemo } from "react";

import { Task } from "../types/task.types";

export const useTaskAnalytics = (tasks: Task[]) => {
  return useMemo(() => {
    const totalTasks = tasks.length;

    const completedTasks = tasks.filter((task) => task.completed).length;

    const pendingTasks = tasks.filter((task) => !task.completed).length;

    const highPriorityTasks = tasks.filter(
      (task) => task.priority === "HIGH",
    ).length;

    const dueTodayTasks = tasks.filter((task) => {
      if (!task.dueDate) return false;

      const today = new Date();

      const dueDate = new Date(task.dueDate);

      return today.toDateString() === dueDate.toDateString();
    }).length;

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      highPriorityTasks,
      dueTodayTasks,
    };
  }, [tasks]);
};
