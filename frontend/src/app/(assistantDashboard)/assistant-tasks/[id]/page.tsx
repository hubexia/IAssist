"use client";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import { ArrowLeft } from "lucide-react";

import { ASSISTANTTASKSROUTE } from "@/lib/constants";

import { tasks } from "@/lib/data";

import TaskInfo from "@/components/tasks/TaskInfo";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

function TaskDetailPage() {
  const params = useParams();

  const taskId = params.id as string;

  const task = useMemo(() => {
    return tasks.find((t) => t.id === taskId);
  }, [taskId]);

  if (!task) return <div className="p-8 text-center">Task Not Found</div>;

  return (
    <div className="py-8 bg-[#F7FAFC] min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-8">
          <Link
            href={ASSISTANTTASKSROUTE}
            className="flex items-center gap-2 cursor-pointer text-muted hover:text-primary-dark"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Tasks
          </Link>
        </div>

        <TaskInfo task={task} />

        <Button className="w-full py-6 bg-[#2B6CB0] hover:bg-[#1A365D] text-lg font-bold rounded-xl shadow-lg shadow-blue-100 transition-all">
          Mark as Complete
        </Button>
      </div>
    </div>
  );
}

export default TaskDetailPage;
