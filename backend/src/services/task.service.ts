import { OPEN } from "../constants.js";
import type { ITask, ITaskStatus } from "../interfaces/task.interface.js";
import TaskRepository from "../repositories/task.repository.js";
import type { CreateTaskType } from "../schemas/task.schema.js";

export default class TaskService {
  private taskRepository = new TaskRepository();

  constructor() {}

  createTask(task: CreateTaskType) {
    this.taskRepository.create({
      ...task,
      status: OPEN,
    });
  }

  getTasks() {
    return this.taskRepository.getTasks();
  }

  getTaskById(id: string) {
    return this.taskRepository.getTaskById(id);
  }

  changeTaskStatus(id: string, status: ITaskStatus) {
    return this.taskRepository.updateTaskStatus(id, status);
  }
}
