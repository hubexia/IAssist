import Stats from "@/components/dashboard/Stats";
import TaskProgress from "@/components/dashboard/TaskProgress";
import TaskAnalytics from "@/components/dashboard/TaskAnalytics";
import Assistants from "@/components/dashboard/Assistants";
import { tasks } from "@/lib/data";
import { ASSISTANT } from "@/lib/constants";
import Header from "@/components/Header";

export default function AssistantDashboardPage() {
  const earning = 345867;
  const stats = [
    {
      label: "Completed Tasks",
      value: "24",
      trend: "+12% from last month",
    },
    {
      label: "Applications",
      value: "12",
    },
    {
      label: "Total Earnings",
      value: earning.toLocaleString(),
      trend: "On track",
    },
    {
      label: "Rating",
      value: "4.8",
      trend: "+12% from last month",
    },
  ];

  return (
    <section className="p-8 bg-surface min-h-screen">
      <Header
        title="Dashboard"
        subtiitle="Plan, prioritize, and accomplish your tasks with ease."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Stats stat={stat} key={stat.label} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <TaskProgress role={ASSISTANT} />
        <TaskAnalytics tasks={tasks} />
      </div>
    </section>
  );
}
