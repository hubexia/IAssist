import Task from "@/components/ui/Task";

import { ASSISTANT, ASSISTANTTASKSROUTE } from "@/lib/constants";
import { tasks } from "@/lib/data";
import Header from "@/components/Header";
import SearchBar from "@/components/ui/SearchBar";

function AssistantTasksPage() {
  return (
    <div className="p-8 bg-surface min-h-screen">
      <Header title="View All Your Tasks">
        <SearchBar />
      </Header>
      <section className=" grid grid-cols-2 gap-4">
        {tasks.map((task) => (
          <Task
            task={task}
            key={task.id}
            className="border-gray-400"
            role={ASSISTANT}
            href={`${ASSISTANTTASKSROUTE}/${task.id}`}
          />
        ))}
      </section>
    </div>
  );
}

export default AssistantTasksPage;
