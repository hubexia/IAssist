"use client";

import { CLIENT } from "@/lib/constants";

import { tasks } from "@/lib/data";
import Task from "@/components/ui/Task";
import TaskPage from "@/components/TaskPage";

export default function ClientTaskPage() {
  return (
    <TaskPage role={CLIENT} title=" View All Your Tasks">
      <section className=" grid md:grid-cols-2 gap-4">
        {tasks.map((task) => (
          <Task
            task={task}
            key={task.id}
            className="border-gray-400"
            role={CLIENT}
          />
        ))}
      </section>
    </TaskPage>
  );
}
