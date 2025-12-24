"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  History, 
  ClipboardList, 
  Scale, 
  Settings,
  PlusCircle,
  UploadCloud,
  Package,
  ChevronDown,
  ChevronRight,
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils"; // Asegúrate de que esta utilidad exista, si no, usa clases normales

// Definición de tipos para el menú
type MenuItem = {
  title: string;
  icon: LucideIcon;
  href?: string; // Opcional porque los grupos no tienen href
  submenu?: {
    title: string;
    href: string;
  }[];
};

const menuItems: MenuItem[] = [
  {
    title: "Panel Principal",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Gestión de Inventario",
    icon: ClipboardList,
    submenu: [
      { title: "Nuevo Conteo", href: "/conteos" },
      { title: "Historial", href: "/historial" },
      { title: "Plantillas", href: "/admin/plantillas" },
      { title: "Carga Masiva", href: "/admin/carga-masiva" },
    ],
  },
  {
    title: "Catálogo Maestro",
    icon: Package,
    submenu: [
      { title: "Productos", href: "/admin/productos" },
      { title: "Unidades (UDM)", href: "/admin/unidades" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  // Estado para controlar qué grupos están abiertos
  // Guardamos el título del grupo abierto
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  // Efecto para abrir automáticamente el grupo donde estás navegando
  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.submenu) {
        const isActive = item.submenu.some((sub) => sub.href === pathname);
        if (isActive && !openGroups.includes(item.title)) {
          setOpenGroups((prev) => [...prev, item.title]);
        }
      }
    });
  }, [pathname]);

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title) // Cerrar si estaba abierto
        : [...prev, title] // Abrir si estaba cerrado
    );
  };

  return (
    <div className="flex flex-col h-full w-64 bg-slate-900 text-white border-r border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold tracking-tight text-orange-500">
          Beasty Inventory
        </h1>
        <p className="text-xs text-slate-400">Sistema de Gestión</p>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          // CASO 1: Es un ITEM SIMPLE (Link normal)
          if (!item.submenu) {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href!}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-orange-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.title}</span>
              </Link>
            );
          }

          // CASO 2: Es un GRUPO CON SUBMENÚ (Botón desplegable)
          const isOpen = openGroups.includes(item.title);
          // Verificar si algún hijo está activo para resaltar el padre
          const isChildActive = item.submenu.some(sub => sub.href === pathname);

          return (
            <div key={item.title} className="space-y-1">
              <button
                onClick={() => toggleGroup(item.title)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors ${
                  isChildActive 
                    ? "text-white bg-slate-800/50" 
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className={`w-5 h-5 ${isChildActive ? "text-orange-500" : ""}`} />
                  <span className="font-medium">{item.title}</span>
                </div>
                {isOpen ? (
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                )}
              </button>

              {/* Submenú desplegable */}
              {isOpen && (
                <div className="space-y-1 pl-4">
                  {item.submenu.map((subItem) => {
                    const isSubActive = pathname === subItem.href;
                    return (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={`flex items-center space-x-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                          isSubActive
                            ? "bg-orange-600/10 text-orange-500 font-medium"
                            : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                        }`}
                      >
                        {/* Pequeño punto para indicar jerarquía */}
                        <div className={`w-1.5 h-1.5 rounded-full ${isSubActive ? "bg-orange-500" : "bg-slate-600"}`} />
                        <span>{subItem.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center space-x-3 px-4 py-3 text-slate-400 cursor-pointer hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
          <span className="text-sm">Configuración</span>
        </div>
      </div>
    </div>
  );
}