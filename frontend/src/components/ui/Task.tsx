"use client";

import { CLIENT, COMPLETED, IN_PROGRESS, PENDING } from "@/lib/constants";
import { ITask, ITaskStatus } from "@/lib/interface/task.interface";
import { IUserRole } from "@/lib/interface/user.interface";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Briefcase, Users, DollarSign, ChevronRight } from "lucide-react";

const getStatusColor = (status: ITaskStatus | undefined) => {
  switch (status) {
    case IN_PROGRESS:
      return "bg-blue-50 text-[#2B6CB0] border-blue-100";
    case PENDING:
      return "bg-amber-50 text-amber-600 border-amber-100";
    case COMPLETED:
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    default:
      return "bg-gray-50 text-gray-500 border-gray-100";
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
  showAssistant?: boolean;
  href: string;
}

function Task({
  task,
  className,
  role,
  showDescription = false,
  showProgress = true,
  showAssistant = true,
  href,
}: ITaskProps) {
  const progress = getProgressPercent(task.status);
  const isClient = role === CLIENT;
  const applications = task.applications || [];

  return (
    <Link
      href={href}
      className={cn(
        "group relative p-5 bg-white border border-gray-100 rounded-[20px] block transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-200",
        className,
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <div>
            <h3 className="font-bold text-[#1A365D] text-base leading-tight group-hover:text-[#2B6CB0] transition-colors">
              {task.title}
            </h3>
            {showAssistant && (
              <p className="text-xs font-medium text-[#718096] mt-1">
                {isClient ? "Assistant ID: " : "Client ID: "}
                <span className="text-[#1A365D]">
                  {isClient
                    ? task.assignedAssistantId || "Unassigned"
                    : task.clientId}
                </span>
              </p>
            )}
          </div>
        </div>
        <span
          className={cn(
            "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border",
            getStatusColor(task.status),
          )}
        >
          {formatStatus(task.status)}
        </span>
      </div>

      {showDescription && (
        <p className="text-sm text-[#718096] leading-relaxed mb-4 line-clamp-2">
          {task.description}
        </p>
      )}

      {showProgress && (
        <div className="mb-4">
          <div className="flex justify-between items-end mb-1.5">
            <span className="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-widest">
              Progress
            </span>
            <span className="text-xs font-black text-[#1A365D]">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                progress === 100 ? "bg-emerald-500" : "bg-[#2B6CB0]",
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <div className="flex items-center gap-4">
          <p className="text-sm font-bold text-[#1A365D]">
            ₦{task.offeredPrice.toLocaleString() || 0}
          </p>

          {isClient && (
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#718096]" />
              <span className="text-xs font-bold text-[#718096]">
                {applications.length}{" "}
                <span className="hidden sm:inline">Proposals</span>
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center text-[#2B6CB0] font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
          View <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}

export default Task;
