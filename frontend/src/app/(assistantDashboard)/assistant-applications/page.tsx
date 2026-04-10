"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
  DollarSign,
  Calendar,
  MoreVertical,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getStatusColor } from "@/lib/utils"; // Assuming this handles 'PENDING', 'ACCEPTED', etc.
import Header from "@/components/Header";
import SearchBar from "@/components/ui/SearchBar";

// Mock data for the assistant's applications
const mockApplications = [
  {
    id: "app_1",
    taskTitle: "Redesign Landing Page",
    clientName: "TechFlow Inc.",
    proposedPrice: 450,
    originalBudget: 400,
    status: "PENDING",
    appliedDate: "2024-03-15",
    message:
      "I have 5 years of experience in React and Tailwind CSS. I can deliver this in 3 days.",
  },
  {
    id: "app_2",
    taskTitle: "Data Entry & Cleanup",
    clientName: "Sarah Jenkins",
    proposedPrice: 120,
    originalBudget: 120,
    status: "ACCEPTED",
    appliedDate: "2024-03-10",
    message: "Available to start immediately. I am very detail-oriented.",
  },
  {
    id: "app_3",
    taskTitle: "Social Media Manager",
    clientName: "Creative Bloom",
    proposedPrice: 800,
    originalBudget: 750,
    status: "REJECTED",
    appliedDate: "2024-03-05",
    message: "I've managed accounts with over 50k followers.",
  },
];

export default function AssistantApplications() {
  const [filter, setFilter] = useState("ALL");

  const filteredApps = mockApplications.filter((app) =>
    filter === "ALL" ? true : app.status === filter,
  );

  return (
    <div className="p-6 bg-[#F7FAFC] min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        <Header
          title="My Applications"
          subtiitle=" Track and manage your sent proposals"
         
        >
          <SearchBar placeholder="Search tasks..." />
        </Header>

        {/* Applications Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${getStatusColor(app.status)}`}
                  >
                    {app.status}
                  </span>
                  <span className="text-[11px] text-[#718096] font-bold flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Applied {new Date(app.appliedDate).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#1A365D] group-hover:text-[#2B6CB0] transition-colors cursor-pointer flex items-center gap-2">
                  {app.taskTitle}
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>

                <p className="text-sm text-[#718096] mt-1 font-medium">
                  Client:{" "}
                  <span className="text-[#1A365D]">{app.clientName}</span>
                </p>
              </div>

              {/* Collapsible/Preview Message */}
              <div className="mt-4 pt-4 border-t border-gray-50">
                <p className="text-sm text-[#718096] italic line-clamp-1">
                  <MessageSquare className="w-3.5 h-3.5 inline mr-2 opacity-50" />
                  &quot;{app.message}&quot;
                </p>
              </div>
            </div>
          ))}

          {filteredApps.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-[#1A365D]">
                No applications found
              </h3>
              <p className="text-[#718096] text-sm">
                Try adjusting your filters or apply for new tasks.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
