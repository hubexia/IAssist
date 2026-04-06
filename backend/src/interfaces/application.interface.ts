import { PENDING, ACCEPTED, REJECTED } from "../constants.js";

export type IApplicationStatus =
  | typeof PENDING
  | typeof ACCEPTED
  | typeof REJECTED;

export interface IApplication {
  id: string;
  taskId: string;
  assistantId: string;
  clientId: string;
  message?: string | undefined;
  proposedPrice: string;
  status: IApplicationStatus;
  createdAt: string;
}
