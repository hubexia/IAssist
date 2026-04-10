"use client";
import { PropsWithChildren, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Plus, Search } from "lucide-react";

import { CLIENT, CLIENTTASKSROUTE } from "@/lib/constants";
import Link from "next/link";

import { IUserRole } from "@/lib/interface/user.interface";

interface ITaskPageProps {
  role: IUserRole;
  title: string;
  showTopText?: boolean;
}

export default function TaskPage({
  role,
  title,
  showTopText = true,
  children,
}: PropsWithChildren<ITaskPageProps>) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main className="p-8 bg-[#F7FAFC] min-h-screen">
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between ">
        <div>
          {showTopText && (
            <p className="text-sm uppercase tracking-[0.3em] text-[#718096] mb-2">
              Task Management
            </p>
          )}
          <h1 className="text-4xl font-bold text-[#1A365D]">{title}</h1>
        </div>

        {role == CLIENT ? (
          <Link href={`${CLIENTTASKSROUTE}/create`}>
            <Button className="flex items-center gap-1 py-1 pl-3 pr-4">
              <Plus className="w-5 h-5" />
              New Task
            </Button>
          </Link>
        ) : null}
      </section>

      <section className="my-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-[1.6fr_1fr]">
          <label className="relative block w-full">
            <span className="sr-only">Search tasks</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#718096]" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search tasks by title, description, or status"
              className="w-full rounded-3xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-[#1A365D] shadow-sm outline-none focus:border-[#2B6CB0] focus:ring-2 focus:ring-[#2B6CB0]/20"
            />
          </label>
        </div>
      </section>

      {children}
    </main>
  );
}
