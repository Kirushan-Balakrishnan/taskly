import React from "react";
import { Task, TaskFilter, TaskItem } from "../../types/Forms";

export type TaskContextType = {
  tasks: Task[];
  addTask: (task: TaskItem) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  updateTask: (task: TaskItem, taskId: string) => Promise<void>;
  updateModal: boolean;
  setUpdateModal: (isOpen: boolean) => void;
  loadingTasks: boolean;
  filter: TaskFilter;
  handleFilter: (filter: TaskFilter) => void;
};

export const TaskContext = React.createContext<TaskContextType>({
  tasks: [],
  addTask: () => Promise.resolve(),
  deleteTask: () => Promise.resolve(),
  updateTask: () => Promise.resolve(),
  updateModal: false,
  setUpdateModal: () => null,
  loadingTasks: false,
  filter: "All",
  handleFilter: () => null,
});
