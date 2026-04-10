import Header from "@/components/Header";
import SearchBar from "@/components/ui/SearchBar";
import Task from "@/components/ui/Task";

import { ALLAVAILABLETASKS, ASSISTANT, OPEN } from "@/lib/constants";
import { tasks } from "@/lib/data";

function AllTasksPage() {
  const availableTasks = tasks.filter((task) => task.status === OPEN);
  return (
    <div className="p-8 bg-surface min-h-screen">
      <Header title="View All Available Task">
        <SearchBar />
      </Header>
      <section className="grid grid-cols-2 gap-4">
        {availableTasks.map((task) => (
          <Task
            task={task}
            key={task.id}
            className="border-gray-400"
            role={ASSISTANT}
            showDescription
            showProgress={false}
            href={`${ALLAVAILABLETASKS}/${task.id}`}
            showAssistant={false}
          />
        ))}
      </section>
    </div>
  );
}

export default AllTasksPage;
