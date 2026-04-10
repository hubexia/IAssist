import { CANCELLED } from "dns";
import { COMPLETED, IN_PROGRESS, OPEN, PENDING } from "../constants";

export type ITaskStatus =
  | typeof OPEN
  | typeof IN_PROGRESS
  | typeof PENDING
  | typeof COMPLETED
  | typeof CANCELLED;

export interface ITask {
  id: string;
  clientId: string;
  assignedAssistantId?: string | null;
  title: string;
  description: string;
  offeredPrice: number;
  locationLat?: number;
  locationLng?: number;
  createdAt: string;
  dueDate?: string;
  status: ITaskStatus;
  applications?: ITaskOffer[];
}

export interface ITaskOffer {
  id: string;
  taskId: string;
  assistantId: string;
  clientId: string;
  proposedPrice: number;
  message?: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export type ITasks = ITask[];
