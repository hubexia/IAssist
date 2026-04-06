import type { ASSISTANT, CLIENT } from "../constants.js";

export type IUserRole = typeof CLIENT | typeof ASSISTANT

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: IUserRole;
}

export interface IRegisteredUser extends IUser {
  id: string;
  createdAt: string;
}

export interface IClientProfile {
  userId: string;
  pendingTasks: number;
}

export interface IAssistantProfile {
  userId: string;
  completedTaskCount: number;
  rating: number;
  skills: string[];
}
