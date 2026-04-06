import type { ITask, ITaskStatus } from "../interfaces/task.interface.js";
import type { CreateTaskType } from "../schemas/task.schema.js";

export default class TaskRepository {
  private tasks: ITask[] = [];

  public create(task: CreateTaskType & { status: ITaskStatus}) {
    this.tasks.push({
      id: this.tasks.length.toString() + 1,
      ...task,
      createdAt: new Date().toISOString(),
    });
  }

  public getTasks() {
    return this.tasks;
  }

  public getTaskById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  public updateTaskStatus(id: string, status: ITaskStatus) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, status } : task,
    );
    return this.tasks;
  }
}
