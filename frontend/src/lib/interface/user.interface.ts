import type {
  APPROVED,
  ASSISTANT,
  CLIENT,
  PENDING,
  REJECTED,
} from "@/lib/constants";

export type IUserRole = typeof CLIENT | typeof ASSISTANT;
export type IAssisantVerificationStatus =
  | typeof PENDING
  | typeof APPROVED
  | typeof REJECTED;

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: IUserRole;
  userId: string;
}

export interface IRegisteredUser extends IUser {
  bio?: string;
  skills?: string[];
  isOnline: boolean;
  rating: number;
  completedTaskCount: number;
  verificationStatus: IAssisantVerificationStatus;
  createdAt: string;
}

export interface IClientProfile {
  pendingTasks: number;
}
