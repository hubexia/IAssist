import { CANCELLED, COMPLETED, IN_PROGRESS, OPEN } from "../constants.js";

export type ITaskStatus =
  | typeof OPEN
  | typeof IN_PROGRESS
  | typeof COMPLETED
  | typeof CANCELLED;

export interface ITask {
  id: string;
  clientId: string;
  assignedAssistantId?: string | null;
  createdAt: string;
  dueDate?: string;
  title: string;
  description: string;
  offeredPrice: number;
  status: ITaskStatus;

  /*
  open: available for assistants to view/apply
  inProgress: client has accepted one assistant
  completed: finished
  cancelled: client removed it or no longer wants it
  */
}
