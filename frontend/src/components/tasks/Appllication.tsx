import { ITask, ITaskOffer } from "@/lib/interface/task.interface";

import { Button } from "../ui/Button";
import { Eye } from "lucide-react";
import { OPEN } from "@/lib/constants";
import { mockAssistants } from "@/lib/data";

function Appllication({
  application,
  task,
}: {
  application: ITaskOffer;
  task: ITask;
}) {
  const assistant = mockAssistants.find(
    (a) => a.id === application.assistantId,
  );
  return (
    <div
      key={application.id}
      className="border border-gray-200 rounded-lg p-4 hover:border-[#2B6CB0]/30 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#4FD1C5] rounded-full flex items-center justify-center text-white font-semibold">
            {assistant?.name.charAt(0) || "A"}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-[#1A365D]">
                {assistant?.name || "Unknown Assistant"}
              </h4>
              <Button
                variant="outline"
                size="sm"
                className="text-xs px-2 py-1 h-auto"
              >
                <Eye className="w-3 h-3 mr-1" />
                View Profile
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#718096] mb-2">
              <span>★ {assistant?.rating || "N/A"}</span>
              <span>•</span>
              <span>{assistant?.completedTasks || 0} tasks completed</span>
              <span>•</span>
              <span>${assistant?.hourlyRate || 0}/hr</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {assistant?.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="inline-block bg-[#F7FAFC] text-[#2B6CB0] text-xs px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold text-[#1A365D]">
            ${application.proposedPrice}
          </div>
          <div
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              application.status === "accepted"
                ? "bg-green-100 text-green-800"
                : application.status === "rejected"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {application.status}
          </div>
        </div>
      </div>

      <p className="text-[#718096] mb-3">{application.message}</p>

      <div className="flex items-center justify-between">
        <span className="text-sm text-[#718096]">
          Applied {new Date(application.createdAt).toLocaleDateString()}
        </span>

        {task.status === OPEN && application.status === "pending" && (
          <div className="flex gap-2">
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                // TODO: Implement accept application logic
                console.log("Accepting application:", application.id);
              }}
            >
              Accept
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
              onClick={() => {
                // TODO: Implement reject application logic
                console.log("Rejecting application:", application.id);
              }}
            >
              Reject
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Appllication;
