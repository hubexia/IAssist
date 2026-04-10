import TaskFlow from "@/components/tasks/TaskFlow";
import CreationForm from "@/components/tasks/CreationForm";
import { CLIENTTASKSROUTE } from "@/lib/constants";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function CreateTaskPage() {
  return (
    <div className="p-8 bg-[#F7FAFC] min-h-screen">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
        <div>
          <Link href={CLIENTTASKSROUTE} className="flex items-center gap-2 mb-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Tasks
          </Link>
          <h1 className="text-4xl font-bold text-[#1A365D]">
            Create a new task
          </h1>
          <p className="max-w-2xl text-[#718096] mt-3">
            Brief your task in detail so assistants can understand the scope,
            timeline, and budget.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.7fr_1fr] gap-4">
        <CreationForm />
        <aside className="space-y-4">
          <TaskFlow />
          {/* <TopRatedAssistant /> */}
        </aside>
      </div>
    </div>
  );
}

export default CreateTaskPage;
