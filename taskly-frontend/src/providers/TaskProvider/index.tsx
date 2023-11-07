import {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TaskContext } from "./context";
import { Task, TaskFilter, TaskItem } from "../../types/Forms";
import { TaskService } from "../../services/task";

type Props = {
  children: ReactNode;
};

export const TaskProvider: React.FC<Props> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [filter, setFilter] = useState<TaskFilter>("All");

  const handleFilter = useCallback((filter: TaskFilter) => {
    setFilter(filter);
  }, []);

  const getTasks = async (filter?: TaskFilter) => {
    setLoadingTasks(true);
    try {
      const tasks = await TaskService.getTasks(filter);
      if (tasks && tasks.length > 0) {
        setTasks(tasks);
      }
      setLoadingTasks(false);
    } catch (error) {
      setLoadingTasks(false);
    }
  };

  const addTask = useCallback(
    async (task: TaskItem) => {
      const response = await TaskService.addTask(task);
      setTasks([response.data, ...tasks]);
    },
    [tasks]
  );

  const deleteTask = useCallback(
    async (taskId: string) => {
      await TaskService.deleteTask(taskId);
      setTasks([...tasks.filter((t) => t.id !== taskId)]);
    },
    [tasks]
  );

  const updateTask = useCallback(
    async (task: TaskItem, taskId: string) => {
      const response = await TaskService.updateTask(task, taskId);
      setTasks([response.data, ...tasks.filter((t) => t.id !== taskId)]);
    },
    [tasks]
  );

  useEffect(() => {
    getTasks(filter);
  }, [filter]);

  const taskContext = useMemo(
    () => ({
      tasks,
      addTask,
      deleteTask,
      updateTask,
      updateModal,
      setUpdateModal,
      loadingTasks,
      filter,
      handleFilter,
    }),
    [
      tasks,
      addTask,
      deleteTask,
      updateTask,
      updateModal,
      setUpdateModal,
      loadingTasks,
      filter,
      handleFilter,
    ]
  );

  return (
    <TaskContext.Provider value={taskContext}>{children}</TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);
