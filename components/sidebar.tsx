"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  History,
  ClipboardList,
  Scale,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    name: "Panel Principal",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Nuevo Conteo",
    href: "/conteos",
    icon: PlusCircle,
  },
  {
    name: "Historial",
    href: "/historial",
    icon: History,
  },
  {
    name: "Gestión de Plantillas",
    href: "/admin/plantillas",
    icon: ClipboardList,
  },
  {
    name: "Unidades (UDM)",
    href: "/admin/unidades",
    icon: Scale,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 bg-slate-900">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-white">🥩 Beasty Butchers</h1>
          </div>
          <nav className="mt-8 flex-1 px-2 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-orange-600 text-white"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 flex-shrink-0 h-5 w-5",
                      isActive ? "text-white" : "text-slate-400 group-hover:text-slate-300"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-slate-700 p-4">
          <div className="flex items-center">
            <div className="text-xs text-slate-400">
              Sistema de Inventarios v1.0
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
