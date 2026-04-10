"use client";
import { SideBar } from "@/components/ui/SideBar";
import { CLIENTDASHBOARDROUTE, CLIENTTASKSROUTE } from "@/lib/constants";
import { LayoutDashboard, ClipboardList } from "lucide-react";

const sideBarItems = [
  { label: "Overview", href: CLIENTDASHBOARDROUTE, icon: LayoutDashboard },
  { label: "Tasks", href: CLIENTTASKSROUTE, icon: ClipboardList },
  // { label: "Assistants", href: ASSISTANTSROUTE, icon: Users },
];
function ClientSideBar() {
  return <SideBar items={sideBarItems} />;
}

export default ClientSideBar;
