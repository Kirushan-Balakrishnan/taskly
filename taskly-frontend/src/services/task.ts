import axios, { AxiosResponse } from "axios";
import { Task, TaskFilter, TaskItem } from "../types/Forms";
import { API_BASE_URL } from "../Config";

const taskUrl = `${API_BASE_URL}/task`;

export class TaskService {
  static async addTask(task: TaskItem): Promise<AxiosResponse<Task>> {
    const response = await axios.post(taskUrl, task);
    return response.data;
  }

  static async getTasks(filter?: TaskFilter): Promise<Task[]> {
    const response = await axios.get(taskUrl, {
      ...(filter
        ? {
            params: {
              filter,
            },
          }
        : {}),
    });
    return response.data;
  }

  static async deleteTask(taskId: string): Promise<void> {
    const response = await axios.delete(`${taskUrl}/${taskId}`);
    return response.data;
  }

  static async updateTask(
    task: TaskItem,
    taskId: string
  ): Promise<AxiosResponse<Task>> {
    const response = await axios.patch(`${taskUrl}/${taskId}`, task);
    return response.data;
  }
}
