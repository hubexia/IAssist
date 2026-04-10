import {  ITaskOffer } from "@/lib/interface/task.interface";

import { Button } from "../ui/Button";

import { IAssistant } from "@/lib/interface/user.interface";

function Application({
  application,
  assistant,
  onAccept,
}: {
  application: ITaskOffer;
  assistant: IAssistant;
  onAccept: (assistantId: string) => void;
}) {
  return (
    <div
      key={application.id}
      className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-3">
          <div className="w-12 h-12 bg-[#E6FFFA] text-[#2C7A7B] rounded-full flex items-center justify-center font-bold text-lg">
            {assistant?.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-[#1A365D]">{assistant?.name}</h4>
            <p className="text-xs text-[#718096] font-medium">
              ★ {assistant?.rating} • {assistant?.completedTasks} tasks
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-extrabold text-[#1A365D]">
            ${application.proposedPrice}
          </p>
        </div>
      </div>

      <p className="text-sm text-[#718096] line-clamp-2 mb-4 italic">
        &quot;{application.message}&quot;
      </p>

      <div className="flex items-center justify-between gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-[#2B6CB0] font-bold text-xs p-0 h-auto uppercase tracking-wider"
        >
          View Profile
        </Button>

        <div className="flex gap-2">
          <Button
            size="sm"
            className="bg-[#2B6CB0] hover:bg-[#1A365D] text-white px-6 font-bold rounded-lg transition-all"
            onClick={() => {
              onAccept(application.id);
            }}
          >
            Accept
          </Button>

          <Button
            size="sm"
            className="bg-red-50 text-red-600 hover:bg-red-100 px-6 border-none shadow-none font-bold"
          >
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Application;
