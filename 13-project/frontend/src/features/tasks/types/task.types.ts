export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  category?: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  createdAt: string;
  updatedAt: string;
}

export const TASK_CATEGORIES = [
  "Development",
  "Fitness",
  "Learning",
  "Personal",
  "Work",
  "Finance",
];
