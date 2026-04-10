"use client";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Check } from "lucide-react";

import { OPEN, ASSISTANTTASKSROUTE } from "@/lib/constants";
import Link from "next/link";
import { tasks } from "@/lib/data";

import TaskInfo from "@/components/tasks/TaskInfo";
import ApplicationForm from "@/components/tasks/ApplicationForm";

function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();

  const taskId = params.id as string;

  const [isApplying, setIsApplying] = useState(false);

  const task = useMemo(() => {
    return tasks.find((t) => t.id === taskId);
  }, [taskId]);

  if (!task) return <div className="p-8 text-center">Task Not Found</div>;

  return (
    <div className="py-8 bg-[#F7FAFC] min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-8">
          <button
            className="flex items-center gap-2 cursor-pointer text-muted hover:text-primary-dark"
            onClick={() =>
              isApplying
                ? setIsApplying(false)
                : router.push(ASSISTANTTASKSROUTE)
            }
          >
            <ArrowLeft className="w-4 h-4" /> Back to Tasks
          </button>
        </div>

        {!isApplying ? (
          /* --- TASK DETAILS VIEW --- */
          <div className="animate-in fade-in duration-300">
            <TaskInfo task={task} />

            {task.status === OPEN && (
              <Button
                onClick={() => setIsApplying(true)}
                className="w-full py-6 bg-[#2B6CB0] hover:bg-[#1A365D] text-lg font-bold rounded-xl shadow-lg shadow-blue-100 transition-all"
              >
                Apply for this Task
              </Button>
            )}
          </div>
        ) : (
          <ApplicationForm task={task} onClose={() => setIsApplying(false)} />
        )}
      </div>
    </div>
  );
}

export default TaskDetailPage;
