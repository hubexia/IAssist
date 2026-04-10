"use client";

import { CLIENT, CLIENTTASKSROUTE } from "@/lib/constants";

import { tasks } from "@/lib/data";
import Task from "@/components/ui/Task";
import Header from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import Link from "next/link";
import SearchBar from "@/components/ui/SearchBar";

export default function ClientTaskPage() {
  return (
    <div className="p-8 bg-surface min-h-screen">
      <Header title=" View All Your Tasks">
        <Link href={`${CLIENTTASKSROUTE}/create`}>
          <Button className="flex items-center gap-1 py-1 pl-3 pr-4">
            <Plus className="w-5 h-5" />
            New Task
          </Button>
        </Link>
      </Header>
      <SearchBar />
      <section className=" grid md:grid-cols-2 gap-4 mt-5">
        {tasks.map((task) => (
          <Task
            task={task}
            key={task.id}
            className="border-gray-400"
            role={CLIENT}
            href={`${CLIENTTASKSROUTE}/${task.id}`}
          />
        ))}
      </section>
    </div>
  );
}
