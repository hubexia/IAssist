import Image from "next/image";

import { ITask } from "@/lib/interface/task.interface";
import { getStatusColor } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";

function TaskInfo({ task }: { task: ITask }) {
  return (
    <>
      <section className="relative w-fit mx-auto mb-8">
        <Image
          src={"/work.png"}
          alt={task.title}
          width={1000}
          height={1000}
          className="md:w-lg md:h-80 rounded-2xl object-cover shadow-md"
        />
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold absolute top-4 right-4 shadow-sm ${getStatusColor(task.status)}`}
        >
          {task.status}
        </span>
      </section>

      <section className="md:flex gap-6 mb-8">
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold text-[#1A365D] mb-4 tracking-tight">
            {task.title}
          </h1>
          <p className="text-[#718096] leading-relaxed text-justify mb-6 text-base">
            {task.description}
          </p>
          <div className="flex flex-wrap items-center gap-6 text-[#718096] text-sm font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#2B6CB0]" />
              <span>
                Created {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
            {task.dueDate && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2B6CB0]" />
                <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            )}
            <div className="px-3 py-1 bg-blue-50 rounded-lg">
              <span className="font-bold text-[#2B6CB0]">
                Budget: ${task.offeredPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TaskInfo;
