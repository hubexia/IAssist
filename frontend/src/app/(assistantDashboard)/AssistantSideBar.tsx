"use client";
import { SideBar } from "@/components/ui/SideBar";
import {
  ALLAVAILABLETASKS,
  ASSISTANTDASHBOARDROUTE,
  ASSISTANTSAPPLICATIONROUTE,
  ASSISTANTTASKSROUTE,
} from "@/lib/constants";
import { LayoutDashboard, ClipboardList, ListTodo, Dock } from "lucide-react";

const sideBarItems = [
  { label: "Overview", href: ASSISTANTDASHBOARDROUTE, icon: LayoutDashboard },
  { label: "All Tasks", href: ALLAVAILABLETASKS, icon: ClipboardList },
  { label: "My Tasks", href: ASSISTANTTASKSROUTE, icon: ListTodo },
  {
    label: "My Applications",
    href: ASSISTANTSAPPLICATIONROUTE,
    icon: Dock,
  },
];

function AssistantSideBar() {
  return <SideBar items={sideBarItems} />;
}

export default AssistantSideBar;
