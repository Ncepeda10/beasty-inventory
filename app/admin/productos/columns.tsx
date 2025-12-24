"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal, Edit, Copy } from "lucide-react"
import { Product, Unit } from "@/lib/db/schema"

// Tipo específico que coincide con las columnas seleccionadas
export type ProductWithUnit = {
  id: number
  name: string
  category: string | null
  active: boolean
  unit_id: number | null
  unit?: Unit | null
}

// Función helper para copiar al portapapeles
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}

export const columns: ColumnDef<ProductWithUnit>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const name = row.getValue("name") as string
      return <div className="font-medium">{name}</div>
    },
  },
  {
    accessorKey: "categoria",
    header: "Categoría",
    cell: ({ row }) => {
      const category = row.getValue("categoria") as string | null
      return <div className="text-gray-600">{category || "Sin categoría"}</div>
    },
  },
  {
    id: "price",
    header: "Precio",
    cell: () => {
      return <div className="text-gray-400">N/A</div>
    },
  },
  {
    id: "unit",
    header: "Unidad",
    cell: ({ row }) => {
      const unit = row.original.unit
      return <div className="text-gray-600">{unit?.name || "Sin unidad"}</div>
    },
  },
  {
    accessorKey: "active",
    header: "Estado",
    cell: ({ row }) => {
      const active = row.original.active as boolean
      return (
        <Badge variant={active ? "default" : "secondary"} className={active ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}>
          {active ? "Activo" : "Inactivo"}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const product = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => copyToClipboard(product.id.toString())}
              className="cursor-pointer"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
