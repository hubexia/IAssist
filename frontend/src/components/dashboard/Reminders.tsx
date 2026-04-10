import { TASKSROUTE } from "@/lib/constants";
import Link from "next/link";
import React from "react";

const reminders = [
  {
    id: "1",
    tasksId: "1",
    title: "Website Redesign",
    message: "Due in 2 days",
  },
  {
    id: "2",
    tasksId: "2",
    title: "Mobile App Development",
    message: "Waiting for proposals",
  },
];

function Reminders() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-primary-dark mb-4">
        Reminders
      </h3>
      <div className="space-y-3">
        {reminders.map((reminder) => (
          <Link
            key={reminder.id}
            href={`${TASKSROUTE}/${reminder.id}`}
            className="p-3 bg-opacity-10 border-l-4  rounded block hover:bg-gray-300"
          >
            <p className="text-sm font-medium text-primary-dark">
              {reminder.title}
            </p>
            <p className="text-xs text-muted mt-1">{reminder.message}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Reminders;
