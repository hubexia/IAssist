"use client";

import Stats from "@/components/dashboard/Stats";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, AlertCircle } from "lucide-react";
import Link from "next/link";

const adminStats = [
  {
    label: "Total Escrow",
    value: "₦42,850",
    trend: "+12.5%",
  },
  {
    label: "Pending Vetting",
    value: "24",
  },
  { label: "Active Tasks", value: "142", trend: "+5.2%" },
  { label: "Total Assistants", value: "1,204" },
];

export default function AdminOverview() {
  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-[#1A365D] tracking-tight">
            Admin Terminal
          </h1>
          <p className="text-[#718096] font-medium mt-1">
            System-wide performance and security overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {adminStats.map((s, i) => (
            <Stats key={i} stat={s} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vetting Queue - Priority List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-primary-dark uppercase tracking-tight  text-sm">
                  Assistant Vetting Queue
                </h2>
                <Link
                  href={""}
                  className="text-[#2B6CB0] hover:text-[#1f4c7d] text-sm font-medium"
                >
                  View All
                </Link>
              </div>

              <div className="divide-y divide-gray-50">
                {[
                  {
                    name: "Alex Rivera",
                    skills: "React, Node.js",
                    date: "2h ago",
                    score: "94%",
                  },
                  {
                    name: "Sarah Chen",
                    skills: "UX Research, Figma",
                    date: "5h ago",
                    score: "88%",
                  },
                  {
                    name: "James Wilson",
                    skills: "Data Entry, Excel",
                    date: "1d ago",
                    score: "72%",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center font-bold text-[#2B6CB0]">
                        {item.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-[#1A365D] text-sm">
                          {item.name}
                        </p>
                        <p className="text-xs text-[#718096]">{item.skills}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-6">
                      <div className="hidden sm:block">
                        <p className="text-[10px] font-black text-[#A0AEC0] uppercase tracking-tighter">
                          Profile Score
                        </p>
                        <p className="text-xs font-black text-emerald-600">
                          {item.score}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-[#1A365D] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#2B6CB0] transition-all"
                      >
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Escrow Alerts */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h2 className="font-black text-[#1A365D] tracking-tight uppercase text-sm mb-6">
                Recent Escrow Transactions
              </h2>
              <div className="space-y-4">
                {[
                  {
                    type: "Disbursement",
                    amount: "₦450.00",
                    to: "Alex Rivera",
                    status: "Success",
                  },
                  {
                    type: "Refund",
                    amount: "₦120.00",
                    to: "TechFlow Inc",
                    status: "Pending",
                  },
                ].map((tx, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${tx.type === "Refund" ? "bg-amber-400" : "bg-emerald-400"}`}
                      />
                      <div>
                        <p className="text-xs font-black text-[#1A365D]">
                          {tx.type} to {tx.to}
                        </p>
                        <p className="text-[10px] text-[#718096] font-medium">
                          {tx.status}
                        </p>
                      </div>
                    </div>
                    <p className="font-black text-[#1A365D] text-sm">
                      {tx.amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="font-black text-[#1A365D] tracking-tight uppercase text-sm mb-4">
              System Alerts
            </h2>
            <div className="space-y-3">
              <div className="flex gap-3 p-3 rounded-xl bg-rose-50 border border-rose-100">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <p className="text-xs font-medium text-rose-700">
                  3 Assistants failed background checks in the last 24h.
                </p>
              </div>
              <div className="flex gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
                <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
                <p className="text-xs font-medium text-blue-700">
                  All security patches are up to date.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
