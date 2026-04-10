import { COMPLETED, IN_PROGRESS, OPEN } from "@/lib/constants";
import { ITask } from "@/lib/interface/task.interface";

function TaskAnalytics({ tasks = [] }: { tasks: ITask[] }) {
  // 1. Calculate counts dynamically from the tasks array
  const counts = {
    completed: tasks.filter((t) => t.status === COMPLETED).length,
    inProgress: tasks.filter((t) => t.status === IN_PROGRESS).length,
    pending: tasks.filter((t) => t.status === OPEN).length,
  };

  const totalTasks = tasks.length;

  // 2. Prepare the data for the bars
  const analyticsData = [
    { label: "Completed", value: counts.completed, color: "#4FD1C5" },
    { label: "In Progress", value: counts.inProgress, color: "#2B6CB0" },
    { label: "Pending", value: counts.pending, color: "#718096" },
  ];

  // 3. Circle Logic (Completion Rate)
  const completionRate =
    totalTasks > 0 ? Math.round((counts.completed / totalTasks) * 100) : 0;

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (completionRate / 100) * circumference;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-primary-dark mb-6">
        Task Analytics
      </h2>

      <div className="">
        {/* Bars Section */}
        <div className="flex-1 space-y-5">
          {analyticsData.map((item) => {
            const percentage =
              totalTasks > 0 ? (item.value / totalTasks) * 100 : 0;

            return (
              <div key={item.label}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm font-medium text-gray-700">
                    {item.label}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {item.value}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: item.color,
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Circular Progress Section */}
        <div className="flex flex-col items-center  pl-8">
          <div className="relative w-1/3 mt-6">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#F1F5F9"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#4FD1C5"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-in-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-extrabold text-primary-dark">
                {completionRate}%
              </span>
            </div>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mt-3">
            Done
          </p>
        </div>
      </div>

      {/* Footer Stat */}
      <div className="mt-6 pt-4 border-t border-gray-50 text-center">
        <p className="text-sm text-gray-500">
          Total Tasks Managed:{" "}
          <span className="font-bold text-gray-800">{totalTasks}</span>
        </p>
      </div>
    </div>
  );
}

export default TaskAnalytics;
