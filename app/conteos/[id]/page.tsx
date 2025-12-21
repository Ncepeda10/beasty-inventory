import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { inventorySessions, templateItems, products, units, templates } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InventoryItemForm } from "./inventory-item-form";
import { getSessionProgress } from "@/lib/actions/sessions";
import { ArrowLeft, Package, CheckCircle, AlertCircle } from "lucide-react";

interface SessionWithTemplate {
  id: number;
  name: string;
  status: string;
  template: {
    id: number;
    name: string;
  };
  products: Array<{
    id: number;
    name: string;
    skuToteat: string | null;
    categoria: string | null;
    defaultUnitId: number | null;
    defaultUnit: {
      id: number;
      name: string;
      abbreviation: string;
    } | null;
  }>;
}

async function getSessionWithProducts(sessionId: number): Promise<SessionWithTemplate | null> {
  try {
    // Obtener la sesión con su plantilla
    const sessionResult = await db
      .select({
        id: inventorySessions.id,
        name: inventorySessions.name,
        status: inventorySessions.status,
        template: {
          id: templates.id,
          name: templates.name,
        },
      })
      .from(inventorySessions)
      .innerJoin(templates, eq(inventorySessions.templateId, templates.id))
      .where(eq(inventorySessions.id, sessionId))
      .limit(1);

    if (sessionResult.length === 0) {
      return null;
    }

    const session = sessionResult[0];

    // Obtener productos asociados a la plantilla de esta sesión
    const productsResult = await db
      .select({
        product: {
          id: products.id,
          name: products.name,
          skuToteat: products.skuToteat,
          categoria: products.categoria,
          defaultUnitId: products.defaultUnitId,
        },
        unit: {
          id: units.id,
          name: units.name,
          abbreviation: units.abbreviation,
        },
      })
      .from(templateItems)
      .innerJoin(products, eq(templateItems.productId, products.id))
      .leftJoin(units, eq(products.defaultUnitId, units.id))
      .where(
        and(
          eq(templateItems.templateId, session.template.id),
          eq(products.isActive, true)
        )
      )
      .orderBy(products.name);

    return {
      ...session,
      products: productsResult.map(({ product, unit }) => ({
        ...product,
        defaultUnit: unit,
      })),
    };
  } catch (error) {
    console.error("Error fetching session with products:", error);
    return null;
  }
}

async function finalizeSession(sessionId: number) {
  "use server";

  try {
    await db
      .update(inventorySessions)
      .set({
        status: 'completed',
        completedAt: new Date(),
      })
      .where(eq(inventorySessions.id, sessionId));

    redirect(`/historial/${sessionId}`);
  } catch (error) {
    console.error("Error finalizing session:", error);
    // En una implementación real, manejaríamos el error mejor
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ConteoPage({ params }: PageProps) {
  const { id } = await params;
  const sessionId = parseInt(id);

  if (isNaN(sessionId)) {
    notFound();
  }

  const sessionData = await getSessionWithProducts(sessionId);

  if (!sessionData) {
    notFound();
  }

  // Si la sesión ya está completada, redirigir al historial
  if (sessionData.status === 'completed') {
    redirect(`/historial/${sessionId}`);
  }

  const progress = await getSessionProgress(sessionId);
  const savedItems = progress.success ? progress.items : [];

  // Crear mapa de cantidades guardadas
  const savedQuantities = new Map<number, { quantity: number; unitId: number }>();
  savedItems.forEach(item => {
    savedQuantities.set(item.productId, { quantity: item.quantity, unitId: item.unitId });
  });

  // Calcular progreso
  const completedCount = savedItems.filter(item => item.quantity > 0).length;
  const totalCount = sessionData.products.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  // Agrupar productos por categoría
  const productsByCategory = sessionData.products.reduce((acc, product) => {
    const category = product.categoria || "Sin Categoría";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, typeof sessionData.products>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-200 p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/conteos">
                <Button variant="outline" size="sm" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Volver
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {sessionData.template.name}
                </h1>
                <p className="text-sm text-gray-600">
                  Sesión #{sessionData.id} • {completedCount} de {totalCount} productos
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">Progreso</div>
              <div className="text-lg font-bold text-orange-600">{Math.round(progressPercentage)}%</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Products by Category */}
        <div className="space-y-4">
          {Object.entries(productsByCategory).map(([category, categoryProducts]) => {
            const categoryCompleted = categoryProducts.filter(product =>
              savedQuantities.has(product.id) && savedQuantities.get(product.id)!.quantity > 0
            ).length;

            return (
              <Card key={category} className="border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{category}</h3>
                    <span className="text-sm text-gray-600">
                      {categoryCompleted} / {categoryProducts.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {categoryProducts.map((product) => {
                      const savedData = savedQuantities.get(product.id);
                      return (
                        <InventoryItemForm
                          key={product.id}
                          sessionId={sessionId}
                          product={product}
                          initialQuantity={savedData?.quantity || 0}
                          initialUnitId={savedData?.unitId || product.defaultUnitId || 1}
                          isCompleted={savedData ? savedData.quantity > 0 : false}
                        />
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-orange-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              {completedCount === totalCount ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  ¡Conteo completado!
                </div>
              ) : (
                <div className="flex items-center text-orange-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {totalCount - completedCount} productos pendientes
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <Link href={`/historial/${sessionId}`}>
                <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                  Ver Progreso
                </Button>
              </Link>

              <form action={finalizeSession.bind(null, sessionId)}>
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                  disabled={completedCount === 0}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Finalizar Conteo
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
