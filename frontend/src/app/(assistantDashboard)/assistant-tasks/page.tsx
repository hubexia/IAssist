import Task from "@/components/ui/Task";
import TaskPage from "@/components/TaskPage";
import { ASSISTANT } from "@/lib/constants";
import { tasks } from "@/lib/data";

function AssistantTasksPage() {
  return (
    <TaskPage role={ASSISTANT} title="View All Your Tasks">
      <section className=" grid grid-cols-2 gap-4">
        {tasks.map((task) => (
          <Task
            task={task}
            key={task.id}
            className="border-gray-400"
            role={ASSISTANT}
          />
        ))}
      </section>
    </TaskPage>
  );
}

export default AssistantTasksPage;
