import Stats from "@/components/dashboard/Stats";
import TaskProgress from "@/components/dashboard/TaskProgress";
import TaskAnalytics from "@/components/dashboard/TaskAnalytics";
import { tasks } from "@/lib/data";
import { CLIENT } from "@/lib/constants";

export default function DashboardPage() {
  const stats = [
    {
      label: "Total Tasks",
      value: "24",
      trend: "+12% from last month",
    },
    {
      label: "Completed",
      value: "12",
      trend: "Increased from last month",
    },
    {
      label: "In Progress",
      value: "7",
      trend: "On track",
    },
    {
      label: "Pending",
      value: "5",
      trend: "Action needed",
    },
  ];

  return (
    <section className="p-8 bg-surface min-h-screen">
      <div className="flex justify-between  mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary-dark">Dashboard</h1>
          <p className="text-muted mt-2 text-sm">
            Plan, prioritize, and accomplish your tasks with ease.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Stats stat={stat} key={stat.label} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <TaskProgress role={CLIENT} />
        <TaskAnalytics tasks={tasks} />
      </div>
    </section>
  );
}
