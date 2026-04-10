"use client";

import { LogOut } from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import Logo from "./Logo";
import { LOGIN } from "@/lib/constants";

interface SideBarItem {
  label: string;
  href: string;
  onClick?: () => void;
  icon: React.ComponentType<{ className?: string }>;
}

export function SideBar({ items }: { items: SideBarItem[] }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="hidden md:block w-64 px-4 bg-white border-r border-gray-200 h-full">
      <Logo className="my-5 ml-5" />
      <nav className="flex h-10/12 flex-col justify-between">
        <ul className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive =
              (item.href && pathname === item.href) ||
              pathname.includes(item.href);

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-900 hover:bg-gray-100",
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5",
                      isActive ? "text-white" : "text-gray-600",
                    )}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => router.push(LOGIN)}
          className=" w-full mt-auto flex items-center cursor-pointer gap-3 px-4 py-2 text-gray-900 font-medium hover:bg-gray-100 rounded-md transition-colors"
        >
          <LogOut className="w-5 h-5 text-gray-600" />
          Logout
        </button>
      </nav>
    </div>
  );
}
