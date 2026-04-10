import {
  ClipboardList,
  UserPlus,
  MessageSquare,
  DollarSign,
} from "lucide-react";


const FLOW = [
  {
    label: "Create Task",
    detail: "Define the scope and timeline.",
    icon: ClipboardList,
  },
  {
    label: "Review Offers",
    detail: "Pick the best assistant.",
    icon: UserPlus,
  },
  {
    label: "Task Details",
    detail: "Finalize brief and milestones.",
    icon: MessageSquare,
  },
  {
    label: "Approve Payment",
    detail: "Secure the task budget.",
    icon: DollarSign,
  },
];

function TaskFlow() {
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm text-[#718096] uppercase tracking-[0.25em]">
            Task flow
          </p>
          <h2 className="text-xl font-semibold text-[#1A365D]">
            What happens next
          </h2>
        </div>
      </div>
      <div className="space-y-4">
        {FLOW.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="rounded-lg border border-[#E2E8F0] bg-[#F7FAFC] p-4"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2B6CB0] text-white">
                  <Icon className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#1A365D]">
                    {item.label}
                  </p>
                  <p className="text-sm text-[#718096]">{item.detail}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TaskFlow;
