"use client";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  Search,
  CheckCircle,
  Mail,
} from "lucide-react";

import {
  OPEN,
  IN_PROGRESS,
  COMPLETED,
  CLIENTTASKSROUTE,
  REJECTED,
} from "@/lib/constants";
import Link from "next/link";
import { mockAssistants, tasks } from "@/lib/data";
import { getStatusColor } from "@/lib/utils";
import Image from "next/image";
// Import your Payment component
import Payment from "@/components/tasks/Payment";

function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string;

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [selectedAmount, setSelectedAmount] = useState(0);

  const task = useMemo(() => {
    return tasks.find((t) => t.id === taskId);
  }, [taskId]);

  if (!task) {
    return (
      <div className="p-8 bg-[#F7FAFC] min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-8 text-center">
            <h1 className="text-2xl font-bold text-[#1A365D] mb-4">
              Task Not Found
            </h1>
            <Button onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const filteredApplications = (task.applications || []).filter(
    (app) => app.status !== REJECTED,
  );

  const assignedAssistant = mockAssistants.find(
    (assistant) => assistant.id == task.assignedAssistantId,
  );

  return (
    <div className="py-8 bg-[#F7FAFC] min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href={CLIENTTASKSROUTE}
            className="flex items-center gap-2 text-[#718096] hover:text-[#1A365D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tasks
          </Link>
        </div>

        {/* Task Image & Details */}
        <div className="relative w-fit mx-auto mb-8">
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
        </div>

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

        {assignedAssistant && (
          <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-bold text-[#1A365D] mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Assigned Assistant
            </h3>

            <div className="bg-white border-2 border-[#2B6CB0]/10 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 bg-[#E6FFFA] text-[#2C7A7B] rounded-full flex items-center justify-center font-bold text-3xl">
                {assignedAssistant.name.charAt(0)}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h4 className="text-2xl font-bold text-[#1A365D]">
                  {assignedAssistant.name}
                </h4>
                <p className="text-[#718096] font-medium mb-2">
                  ★ {assignedAssistant.rating} •{" "}
                  {assignedAssistant.completedTasks} Tasks Completed
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-[#2B6CB0] text-[#2B6CB0]"
                  >
                    <Mail className="w-4 h-4 mr-2" /> Message
                  </Button>
                  <Button variant="ghost" size="sm" className="text-[#718096]">
                    View Profile
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 px-6 py-4 rounded-xl text-center">
                <p className="text-xs font-bold text-[#718096] uppercase tracking-wider mb-1">
                  Contract Price
                </p>
                <p className="text-2xl font-black text-[#1A365D]">
                  ${task.offeredPrice}
                </p>
              </div>
            </div>
          </div>
        )}

        {task.applications && !task.assignedAssistantId && (
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h3 className="text-xl font-bold text-[#1A365D] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#2B6CB0]" />
                Applications
              </h3>
              <div className="relative md:w-1/2">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#718096]" />
                <input
                  type="search"
                  placeholder="Search assistants..."
                  className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#2B6CB0]/20 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredApplications.map((application) => {
                const assistant = mockAssistants.find(
                  (a) => a.id === application.assistantId,
                );
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
                          <h4 className="font-bold text-[#1A365D]">
                            {assistant?.name}
                          </h4>
                          <p className="text-xs text-[#718096] font-medium">
                            ★ {assistant?.rating} • {assistant?.completedTasks}{" "}
                            tasks
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

                      {/* 2. Modified Accept Button to trigger Payment Modal */}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-[#2B6CB0] hover:bg-[#1A365D] text-white px-6 font-bold rounded-lg transition-all"
                          onClick={() => {
                            setSelectedAmount(application.proposedPrice);
                            setIsPaymentModalOpen(true);
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
              })}
            </div>
          </div>
        )}

        {/* 3. The Modal Component Injection */}
        <Payment
          taskId={taskId}
          amount={selectedAmount || task.offeredPrice} // Fallback to task budget if none selected
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          userEmail="client@example.com" // You can pass dynamic user email here
        />

        {/* Global Task Actions */}
        <div className="flex gap-4 border-t border-gray-100 ">
          {task.status === OPEN && (
            <Button className="bg-red-50 text-red-600 hover:bg-red-100 border-none shadow-none font-bold">
              Delete Task
            </Button>
          )}
          {task.status === IN_PROGRESS && (
            <Button className="bg-green-600 hover:bg-green-700 font-bold px-8">
              Approve
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskDetailPage;
