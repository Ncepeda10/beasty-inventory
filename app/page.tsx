import Link from "next/link";
import { db } from "@/lib/db";
import { templates } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

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

export default async function Home() {
  const templatesList = await getTemplates();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Beasty Butchers
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sistema de Gestión de Inventarios - Selecciona una plantilla para comenzar el conteo
            </p>
          </div>
          <div className="ml-8">
            <Link href="/historial">
              <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                📋 Historial
              </Button>
            </Link>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templatesList.map((template) => (
            <Link key={template.id} href={`/inventario/${template.id}`}>
              <Card className="h-full cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-orange-200 hover:border-orange-300 bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
                    {template.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {template.description || "Plantilla de inventario"}
                  </CardDescription>
                </CardHeader>
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      ID: {template.numeroPlantilla}
                    </span>
                    <div className="flex items-center text-orange-600">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="text-sm font-medium">Comenzar Conteo</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {templatesList.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay plantillas disponibles</h3>
            <p className="text-gray-600">
              Las plantillas de inventario se cargarán automáticamente desde la base de datos.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-gray-500">
          <p>Sistema de Inventarios • Beasty Butchers</p>
        </div>
      </div>
    </div>
  );
}
