import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { templates, templateItems, products, units } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { InventoryForm } from "./inventory-form";

interface TemplateWithProducts {
  id: number;
  name: string;
  description: string | null;
  products: Array<{
    id: number;
    name: string;
    skuToteat: string | null;
    unidadBase: string | null;
    categoria: string | null;
    defaultUnit: {
      id: number;
      name: string;
      abbreviation: string;
    } | null;
  }>;
}

async function getTemplateWithProducts(templateId: number): Promise<TemplateWithProducts | null> {
  try {
    // Obtener la plantilla
    const templateResult = await db
      .select()
      .from(templates)
      .where(and(eq(templates.id, templateId), eq(templates.isActive, true)))
      .limit(1);

    if (templateResult.length === 0) {
      return null;
    }

    const template = templateResult[0];

    // Obtener los productos asociados con sus unidades
    const productsResult = await db
      .select({
        product: products,
        unit: units,
      })
      .from(templateItems)
      .innerJoin(products, eq(templateItems.productId, products.id))
      .leftJoin(units, eq(products.defaultUnitId, units.id))
      .where(and(
        eq(templateItems.templateId, templateId),
        eq(products.isActive, true)
      ))
      .orderBy(templateItems.order);

    return {
      id: template.id,
      name: template.name,
      description: template.description,
      products: productsResult.map(({ product, unit }) => ({
        id: product.id,
        name: product.name,
        skuToteat: product.skuToteat,
        unidadBase: product.unidadBase,
        categoria: product.categoria,
        defaultUnit: unit ? {
          id: unit.id,
          name: unit.name,
          abbreviation: unit.abbreviation,
        } : null,
      })),
    };
  } catch (error) {
    console.error("Error fetching template with products:", error);
    return null;
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InventoryPage({ params }: PageProps) {
  const { id } = await params;
  const templateId = parseInt(id);

  if (isNaN(templateId)) {
    notFound();
  }

  const templateData = await getTemplateWithProducts(templateId);

  if (!templateData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Inventario: {templateData.name}
              </h1>
              <p className="text-gray-600">
                {templateData.description || "Complete el conteo de productos para esta plantilla"}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Plantilla ID</div>
              <div className="text-lg font-semibold text-orange-600">{templateData.id}</div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-200 p-4 mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Productos a contar: {templateData.products.length}</span>
            <span>Progreso: 0 / {templateData.products.length}</span>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div className="bg-orange-500 h-2 rounded-full transition-all duration-300" style={{ width: '0%' }}></div>
          </div>
        </div>

        {/* Inventory Form */}
        <InventoryForm
          templateId={templateData.id}
          products={templateData.products}
        />
      </div>
    </div>
  );
}

