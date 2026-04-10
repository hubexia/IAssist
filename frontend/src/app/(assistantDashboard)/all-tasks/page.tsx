import Task from "@/components/ui/Task";
import TaskPage from "@/components/TaskPage";
import { ASSISTANT } from "@/lib/constants";
import { tasks } from "@/lib/data";

function AllTasksPage() {
  return (
    <TaskPage role={ASSISTANT} title="View All Available Tasks" showTopText={false} >
      <section className=" grid grid-cols-2 gap-4">
        {tasks.map((task) => (
          <Task
            task={task}
            key={task.id}
            className="border-gray-400"
            role={ASSISTANT}
            showDescription
            showProgress={false}
          />
        ))}
      </section>
    </TaskPage>
  );
}

export default AllTasksPage;
