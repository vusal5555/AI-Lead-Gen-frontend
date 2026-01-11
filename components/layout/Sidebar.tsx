"use client";

import { LayoutDashboard, Users, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {};

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
];

const Sidebar = (props: Props) => {
  const path = usePathname();
  return (
    <aside className="w-64  bg-muted/10 text-white">
      <div className="mb-10">
        <h1 className="text-4xl font-bold p-3">Lead Gen</h1>
      </div>

      <nav>
        {navItems.map((item) => {
          const isActive = path === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-3 hover:bg-muted/20 ${
                isActive ? "bg-muted/20 font-semibold" : ""
              }`}
            >
              <item.icon />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
