import {
  CLIENT,
  CLIENTTASKSROUTE,
  ASSISTANTTASKSROUTE,
  COMPLETED,
  IN_PROGRESS,
  PENDING,
} from "@/lib/constants";
import { ITask, ITaskStatus } from "@/lib/interface/task.interface";
import { IUserRole } from "@/lib/interface/user.interface";
import { cn } from "@/lib/utils";
import Link from "next/link";

const getStatusColor = (status: ITaskStatus | undefined) => {
  switch (status) {
    case IN_PROGRESS:
      return "bg-blue-100 text-primary";
    case PENDING:
      return "bg-yellow-100 text-muted";
    case COMPLETED:
      return "bg-teal-100/70 text-secondary";
    default:
      return "bg-gray-100 text-muted";
  }
};

const getProgressPercent = (status: ITaskStatus | undefined) => {
  switch (status) {
    case PENDING:
      return 0;
    case IN_PROGRESS:
      return 50;
    case COMPLETED:
      return 100;
    default:
      return 0;
  }
};

const formatStatus = (status: ITaskStatus | undefined) => {
  return status
    ? status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "";
};

interface ITaskProps {
  task: ITask;
  className?: string;
  role: IUserRole;
  showDescription?: boolean;
  showProgress?: boolean;
}

function Task({
  task,
  className,
  role,
  showDescription = false,
  showProgress = true,
}: ITaskProps) {
  const progress = getProgressPercent(task.status);

  const isClient = role == CLIENT;
  const applications = task.applications || [];

  return (
    <Link
      href={`${isClient ? CLIENTTASKSROUTE : ASSISTANTTASKSROUTE}/${task.id}`}
      key={task.id}
      className={cn(
        "p-4 border block border-gray-100 rounded-lg hover:border-primary hover:shadow-xs hover:shadow-primary cursor-pointer transition-colors",
        className,
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-primary-dark">{task.title}</h3>
          <p className="text-sm text-muted">
            by {isClient ? task.assignedAssistantId : task.clientId}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}
        >
          {formatStatus(task.status)}
        </span>
      </div>

      {showDescription && (
        <p className="text-sm text-muted text-justify line-clamp-3  ">
          {task.description}
        </p>
      )}
      {showProgress && (
        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div
            className={`h-2 rounded-full transition-all ${
              progress === 100 ? "bg-secondary" : "bg-primary"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="flex justify-between text-sm">
        {showProgress && (
          <span className="text-muted">{progress}% Complete</span>
        )}
        {isClient ? (
          <span className="text-primary font-medium">
            {applications.length} offer{applications.length <= 1 ? "" : "s"}
          </span>
        ) : null}
      </div>
    </Link>
  );
}

export default Task;
