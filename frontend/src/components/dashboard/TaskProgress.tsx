import Link from "next/link";

import { tasks } from "@/lib/data";
import Task from "../ui/Task";
import {
  ASSISTANT,
  ASSISTANTTASKSROUTE,
  CLIENT,
  CLIENTTASKSROUTE,
} from "@/lib/constants";
import { IUserRole } from "@/lib/interface/user.interface";

function TaskProgress({ role }: { role: IUserRole }) {
  const isClient = role == CLIENT;

  const currentRole = isClient ? CLIENT : ASSISTANT;
  const currentRoleTaskRoute = isClient
    ? CLIENTTASKSROUTE
    : ASSISTANTTASKSROUTE;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-primary-dark">
          Task Progress
        </h2>
        <Link
          href={currentRoleTaskRoute}
          className="text-[#2B6CB0] hover:text-[#1f4c7d] text-sm font-medium"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {tasks.slice(0, 3).map((task) => (
          <Task
            task={task}
            key={task.id}
            role={currentRole}
            href={`${currentRoleTaskRoute}/${task.id}`}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskProgress;
