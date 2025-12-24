import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { templates, products, templateItems } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ProductToggler } from "./product-toggler";
import { ArrowLeft, Package, CheckCircle, Circle } from "lucide-react";

interface TemplateWithProducts {
  id: number;
  name: string;
  description: string | null;
  products: Array<{
    id: number;
    name: string;
    skuToteat: string | null;
    categoria: string | null;
    isSelected: boolean;
  }>;
}

async function getTemplateWithProducts(templateId: number): Promise<TemplateWithProducts | null> {
  try {
    // Obtener info de la plantilla
    const templateResult = await db
      .select()
      .from(templates)
      .where(and(eq(templates.id, templateId), eq(templates.isActive, true)))
      .limit(1);

    if (templateResult.length === 0) {
      return null;
    }

    const template = templateResult[0];

    // Obtener todos los productos
    const allProducts = await db
      .select({
        id: products.id,
        name: products.name,
        skuToteat: products.skuToteat,
        categoria: products.categoria,
      })
      .from(products)
      .where(eq(products.isActive, true))
      .orderBy(products.name);

    // Obtener productos ya incluidos en la plantilla
    const templateProducts = await db
      .select({
        productId: templateItems.productId,
      })
      .from(templateItems)
      .where(eq(templateItems.templateId, templateId));

    // Crear set de productos seleccionados para búsqueda rápida
    const selectedProductIds = new Set(templateProducts.map(tp => tp.productId));

    // Combinar datos
    const productsWithSelection = allProducts.map(product => ({
      ...product,
      isSelected: selectedProductIds.has(product.id),
    }));

    return {
      id: template.id,
      name: template.name,
      description: template.description,
      products: productsWithSelection,
    };
  } catch (error) {
    console.error("Error fetching template with products:", error);
    return null;
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PlantillaConfigPage({ params }: PageProps) {
  const { id } = await params;
  const templateId = parseInt(id);

  if (isNaN(templateId)) {
    notFound();
  }

  const templateData = await getTemplateWithProducts(templateId);

  if (!templateData) {
    notFound();
  }

  const selectedCount = templateData.products.filter(p => p.isSelected).length;
  const totalCount = templateData.products.length;

  // Agrupar productos por categoría
  const productsByCategory = templateData.products.reduce((acc, product) => {
    const category = product.categoria || "Sin Categoría";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, typeof templateData.products>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin/plantillas">
                <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Configurar: {templateData.name}
                </h1>
                <p className="text-gray-600">
                  Selecciona los productos que incluirás en esta plantilla de inventario
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Productos seleccionados</div>
              <div className="text-2xl font-bold text-orange-600">{selectedCount} / {totalCount}</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-200 p-4 mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Progreso de configuración</span>
            <span>{selectedCount} de {totalCount} productos</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${totalCount > 0 ? (selectedCount / totalCount) * 100 : 0}%` }}
            ></div>
          </div>
        </div>

        {/* Products by Category */}
        <div className="space-y-6">
          {Object.entries(productsByCategory).map(([category, categoryProducts]) => {
            const selectedInCategory = categoryProducts.filter(p => p.isSelected).length;

            return (
              <Card key={category} className="border-orange-200">
                <CardHeader className="bg-orange-50 border-b border-orange-200">
                  <CardTitle className="text-lg text-orange-900 flex items-center justify-between">
                    <span>{category}</span>
                    <span className="text-sm font-normal">
                      {selectedInCategory} / {categoryProducts.length} seleccionados
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryProducts.map((product) => (
                      <ProductToggler
                        key={product.id}
                        templateId={templateData.id}
                        product={product}
                        initialChecked={product.isSelected}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-orange-200 p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Plantilla configurada con {selectedCount} productos de {totalCount} disponibles
            </div>
            <div className="flex space-x-4">
              <Link href="/admin/plantillas">
                <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                  Guardar y Volver
                </Button>
              </Link>
              <Link href={`/inventario/${templateData.id}`}>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Package className="w-4 h-4 mr-2" />
                  Probar Inventario
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





