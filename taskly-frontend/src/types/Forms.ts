export type LoginFormValues = {
  email: string;
  password: string;
};

export enum TaskStatus {
  TO_DO = "To Do",
  IN_PROGRESS = "In Progress",
  DONE = "Done",
}

export type TaskItem = {
  title: string;
  description?: string;
  status: TaskStatus;
};

export type Task = TaskItem & { id: string };

export const taskFilters = [
  "All",
  TaskStatus.TO_DO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.DONE,
] as const;
export type TaskFilter = (typeof taskFilters)[number];
