import Link from "next/link";
import { db } from "@/lib/db";
import { templates } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createSession } from "@/lib/actions/sessions";
import { redirect } from "next/navigation";
import { Plus, Package, Clock } from "lucide-react";

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

async function startSession(templateId: number) {
  "use server";

  const result = await createSession(templateId);

  if (result.success && result.sessionId) {
    redirect(`/conteos/${result.sessionId}`);
  } else {
    // En una implementación real, mostraríamos un error
    console.error("Error creating session:", result.error);
    // Por ahora, redirigir de vuelta
    redirect("/conteos");
  }
}

export default async function ConteosPage() {
  const allTemplates = await getTemplates();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Nuevo Conteo de Inventario
              </h1>
              <p className="text-gray-600">
                Selecciona una plantilla para iniciar un nuevo conteo de inventario
              </p>
            </div>
            <Link href="/">
              <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                ← Volver al Dashboard
              </Button>
            </Link>
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

                <form action={startSession.bind(null, template.id)}>
                  <Button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3"
                    size="lg"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Iniciar Conteo
                  </Button>
                </form>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {allTemplates.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-orange-200">
            <div className="text-gray-400 mb-4">
              <Package className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay plantillas disponibles</h3>
            <p className="text-gray-600 mb-4">
              Las plantillas se cargarán automáticamente desde la base de datos.
            </p>
            <Link href="/admin/plantillas">
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Package className="w-4 h-4 mr-2" />
                Gestionar Plantillas
              </Button>
            </Link>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-blue-900 mb-2">
                ¿Cómo funciona el conteo?
              </h3>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• Selecciona una plantilla para iniciar un nuevo conteo</li>
                <li>• Completa las cantidades para cada producto</li>
                <li>• Los cambios se guardan automáticamente</li>
                <li>• Finaliza cuando hayas completado todos los productos</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Total de plantillas: {allTemplates.length} • Sistema de Inventarios Beasty Butchers</p>
        </div>
      </div>
    </div>
  );
}
