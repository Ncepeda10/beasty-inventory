import { db } from "@/lib/db";
import { units } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit } from "lucide-react";

async function getUnits() {
  try {
    const result = await db.select().from(units).orderBy(units.name);
    return result;
  } catch (error) {
    console.error("Error fetching units:", error);
    return [];
  }
}

export default async function UnidadesPage() {
  const allUnits = await getUnits();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Gestión de Unidades (UDM)
              </h1>
              <p className="text-gray-600">
                Administra las unidades de medida utilizadas en el sistema de inventarios
              </p>
            </div>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Unidad
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-200 overflow-hidden">
          {allUnits.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay unidades registradas</h3>
              <p className="text-gray-600 mb-4">
                Las unidades de medida se cargarán automáticamente desde la base de datos.
              </p>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Plus className="w-4 h-4 mr-2" />
                Crear Primera Unidad
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-orange-50">
                  <TableHead className="font-semibold text-orange-900">Nombre</TableHead>
                  <TableHead className="font-semibold text-orange-900">Abreviación</TableHead>
                  <TableHead className="font-semibold text-orange-900 text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allUnits.map((unit) => (
                  <TableRow key={unit.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">
                      {unit.name}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {unit.abbreviation}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Total de unidades: {allUnits.length} • Sistema de Inventarios Beasty Butchers</p>
        </div>
      </div>
    </div>
  );
}
