import Link from "next/link";
import { db } from "@/lib/db";
import { templates } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, Settings, Package } from "lucide-react";

async function getTemplates() {
  try {
    const result = await db
      .select()
      .from(templates)
      .where(eq(templates.isActive, true))
      .orderBy(templates.numeroPlantilla);

    return result;
  } catch (error) {
    console.error("Error fetching templates:", error);
    return [];
  }
}

export default async function PlantillasPage() {
  const allTemplates = await getTemplates();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Gestión de Plantillas
              </h1>
              <p className="text-gray-600">
                Administra las plantillas de inventario y configura qué productos incluir en cada una
              </p>
            </div>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <ClipboardList className="w-4 h-4 mr-2" />
              Nueva Plantilla
            </Button>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTemplates.map((template) => (
            <Card key={template.id} className="h-full hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
                  {template.name}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {template.description || "Plantilla de inventario"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>ID: {template.numeroPlantilla}</span>
                  <span className="flex items-center">
                    <Package className="w-4 h-4 mr-1" />
                    Activa
                  </span>
                </div>
                <Link href={`/admin/plantillas/${template.id}`}>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    <Settings className="w-4 h-4 mr-2" />
                    Configurar Productos
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {allTemplates.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-orange-200">
            <div className="text-gray-400 mb-4">
              <ClipboardList className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay plantillas disponibles</h3>
            <p className="text-gray-600 mb-4">
              Las plantillas se cargarán automáticamente desde la base de datos.
            </p>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <ClipboardList className="w-4 h-4 mr-2" />
              Crear Primera Plantilla
            </Button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Total de plantillas: {allTemplates.length} • Sistema de Inventarios Beasty Butchers</p>
        </div>
      </div>
    </div>
  );
}
